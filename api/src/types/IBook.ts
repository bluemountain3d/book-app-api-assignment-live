import mongoose from "mongoose";
import { IReview } from ../types/IReview.ts;

export interface IBook {
  title: string;
  description: string;
  author: string;
  genres: string[];
  image: string;
  published_year: number;
  reviews: mongoose.Types.ObjectId[] | IReview[];
}