'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importDefault(require('mongoose'));
const bcrypt_1 = __importDefault(require('bcrypt'));
const node_crypto_1 = require('node:crypto');
const Schema = mongoose_1.default.Schema;
const SALT_WORK_FACTORY = 10;
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return __awaiter(this, void 0, void 0, function* () {
          if (!this.isModified('email')) return true;
          const user = yield User.findOne({ email: value });
          return !user;
        });
      },
      message: 'This email is already taken.',
    },
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
UserSchema.pre('save', function (next) {
  return __awaiter(this, void 0, void 0, function* () {
    if (!this.isModified('password')) return next();
    const salt = yield bcrypt_1.default.genSalt(SALT_WORK_FACTORY);
    this.password = yield bcrypt_1.default.hash(this.password, salt);
  });
});
UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});
UserSchema.methods.generateToken = function () {
  return __awaiter(this, void 0, void 0, function* () {
    this.token = (0, node_crypto_1.randomUUID)();
  });
};
UserSchema.methods.checkPassword = function (password) {
  return __awaiter(this, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(password, this.password);
  });
};
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
