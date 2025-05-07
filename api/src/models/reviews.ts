import mongoose from "mongoose";
import { IReview } from "../types/IReview.ts";
const Schema = mongoose.Schema;

const ReviewsSchema = new Schema<IReview>({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model('Reviews', ReviewsSchema);