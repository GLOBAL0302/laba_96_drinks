import express from 'express';
import { Error } from 'mongoose';
import Cocktail from '../models/Cocktail';
import { imagesUpload } from '../multer';
import auth, { RequestWithUser } from '../middleware/auth';

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', auth, async (req, res, next) => {
  try {
    const expressReq = req as RequestWithUser;
    const user = expressReq.user;

    const cocktails = await Cocktail.find({ user: user._id });
    res.status(200).send(cocktails);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error);
    }
    next();
  }
});

cocktailsRouter.post('/', imagesUpload.single('image'), auth, async (req, res, next) => {
  let expressReq = req as RequestWithUser;
  const user = expressReq.user;

  const parsedIngredients = JSON.parse(req.body.ingredients);

  try {
    const newCocktail = new Cocktail({
      user: user._id,
      title: req.body.title,
      image: req.file ? 'images' + req.file.filename : null,
      ingredients: parsedIngredients,
      recipe: req.body.recipe,
      isPublished: false,
    });
    console.log(newCocktail);
    await newCocktail.save();
    res.status(200).send({
      message: 'Cocktails created successfully.',
      newCocktail,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error);
    }
  }
  next();
});

export default cocktailsRouter;
