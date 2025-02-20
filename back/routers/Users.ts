import express from 'express';
import { Error } from 'mongoose';
import { imagesUpload } from '../multer';
import User from '../models/User';
import auth, { RequestWithUser } from '../middleware/auth';

const usersRouter = express.Router();

usersRouter.post(
  '/register',
  imagesUpload.single('avatar'),
  async (req: express.Request, res: express.Response, next) => {

    try {
      const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        avatar: req.file ? 'images' + req.file.filename : null,
        password: req.body.password,
        role: 'user',
      });


      user.generateToken();
      await user.save();
      res.status(200).send({ message: 'Successfully registered', user });
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        res.status(400).send(error);
        return;
      }
      next();
    }
  },
);

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      res.status(400).send('No User Found');
      return;
    }
    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) {
      res.status(400).send({ error: 'Password is incorrect' });
    }

    user.generateToken();
    await user.save();

    res.status(200).send({ message: 'email and password are correct', user });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
      return;
    }
    next();
  }
});

usersRouter.delete('/logout', auth, async (req, res, next) => {
  let reqWithUser = req as RequestWithUser;
  const userFromAuth = reqWithUser.user;
  console.log(auth);

  try {
    const user = await User.findOne({ _id: userFromAuth._id });
    if (user) {
      user.generateToken();
      await user.save();
      res.send({ message: 'Successfully logged out', user });
    }
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
      return;
    }
    next();
  }
});

export default usersRouter;
