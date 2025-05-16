import mongoose from "mongoose";
import { IBook } from "../types/IBook";
const Schema = mongoose.Schema;

const BookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },

  genres: {
    type: [String],   
    default: [],
    required: true,       
  },

  image: {
    type: String,
    required: true,
  },

  published_year: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: false,
    enum: ["sale", "popular", "customer favourites", "neutral"],
    default: "neutral",
  },

  reviews: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'Reviews'}
  ]
});

export default mongoose.model('Books', BookSchema);