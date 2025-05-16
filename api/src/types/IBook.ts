import mongoose from "mongoose";
import { IReview } from "./IReview";

export interface IBook {
  title: string;
  description: string;
  author: string;
  genres: string[];
  image: string;
  published_year: number;
  category?: string;
  reviews: mongoose.Types.ObjectId[] | IReview[];
}