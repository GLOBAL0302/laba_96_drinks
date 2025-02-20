import mongoose, { HydratedDocument, Model } from 'mongoose';
import { IUserField } from '../types';
import bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';

interface IUserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<IUserField, {}, IUserMethods>;

const regEmail = /^(\w+[-.]?\w+)@(\w+)([.-]?\w+)?(\.[a-zA-Z]{2,3})$/;
const Schema = mongoose.Schema;
const SALT_WORK_FACTORY = 10;

const UserSchema = new Schema<HydratedDocument<IUserField>, UserModel, IUserMethods>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [
      {
        validator: async function (this: HydratedDocument<IUserField>, value: string): Promise<boolean> {
          if (!this.isModified('email')) return true;
          const user: IUserField | null = await User.findOne({ email: value });
          return !user;
        },
        message: 'This email is already taken',
      },
      {
        validator: async function (this: HydratedDocument<IUserField>, value: string): Promise<boolean> {
          if (!this.isModified('email')) return true;
          return regEmail.test(value)
        },
        message: 'Incorrect email format',
      }
    ]
  },
  displayName: String,
  avatar: String,
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['user', 'admin'],
  },
  token: {
    type: String,
    required: [true, 'Token is required'],
  },
  googleId: String,
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTORY);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.set('toJSON', {
  transform: function (doc: any, ret: any) {
    delete ret.password;
    return ret;
  },
});

UserSchema.methods.generateToken = async function () {
  this.token = randomUUID();
};

UserSchema.methods.checkPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};


const User = mongoose.model('User', UserSchema);
export default User;
