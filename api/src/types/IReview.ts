import { Types } from 'mongoose';

export interface IReview {
    name: String;
    title: String;
    content: String;
    rating: Number;
    bookId: Types.ObjectId; 
    created_at: Date;
}