import express from 'express';
import { Error } from 'mongoose';
import Cocktail from '../models/Cocktail';
import { imagesUpload } from '../multer';

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', async (req, res, next) => {
  try {
    const cocktails = await Cocktail.find();
    res.status(200).send(cocktails);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error);
    }
    next();
  }
});

cocktailsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error);
    }
  }
  next();
});
