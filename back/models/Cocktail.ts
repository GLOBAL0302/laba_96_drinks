import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CockTailSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    required: [true, 'Title is required'],
    type: String,
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
  },
  recipe: String,
  isPublished: {
    type: Boolean,
    default: false,
  },
  ingredients: [
    {
      title: { type: String },
      amount: { type: String },
    },
  ],
  reviews: [
    {
      user: { type: Schema.Types.ObjectId, required: [true, 'Review is required'] },
      rating: { type: Number },
    },
  ],
});

const Cocktail = mongoose.model('Cocktail', CockTailSchema);
export default Cocktail;
