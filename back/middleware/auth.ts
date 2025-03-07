import { HydratedDocument } from 'mongoose';
import User from '../models/User';
import { Request, Response, NextFunction } from 'express';
import { IUserField } from '../types';

export interface RequestWithUser extends Request {
  user: HydratedDocument<IUserField>;
}

const auth = async (expressReq: Request, res: Response, next: NextFunction) => {
  const req = expressReq as RequestWithUser;

  const token = req.get('Authorization');

  if (!token) {
    res.status(401).send('No token provided.');
  }

  const user = await User.findOne({ token });
  if (!user) {
    res.status(301).send('No token provided.');
    return;
  }

  req.user = user;
  next();
};

export default auth;
