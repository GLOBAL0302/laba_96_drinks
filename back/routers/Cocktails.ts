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
    const { role } = req.query;

    const filter = role === 'admin' ? {} : { user: user._id };
    const cocktails = await Cocktail.find(filter);
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

cocktailsRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deletedCocktail = await Cocktail.deleteOne({ _id: id });
    console.log(deletedCocktail);
    res.status(200).send({ message: 'Cocktails deleted successfully.', deletedCocktail });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
    }
    next(error);
  }
});

export default cocktailsRouter;
