'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importDefault(require('mongoose'));
const Schema = mongoose_1.default.Schema;
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
const Cocktail = mongoose_1.default.model('Cocktail', CockTailSchema);
exports.default = Cocktail;
