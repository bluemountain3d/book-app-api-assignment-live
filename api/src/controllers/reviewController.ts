import { Request, Response } from "express";

import reviews from "../models/reviews";
import book from "../models/book";

// GET all reviews
export const getAllreviews = async(req: Request, res: Response) => {
    try {
        res.json(await reviews.find())
    } catch(error: unknown) {
        const message = error  instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({error: message})
    }
}

// GET reviews by ID
export const getReviewById = async (req: Request, res: Response) => {
    try {
        const review = await reviews.findById(req.params.id);

        if (!review) {
            res.status(404).json({message: 'No review with that ID was found'})
            return;
        }
        res.json(review)
    }
    catch(error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({error: message})
    }
}

// POST new reviews
export const addNewReview = async (req: Request, res: Response) => {
    const { name, title, content, rating, bookId } = req.body;

    if (!name || !title || !content || !rating || !bookId) {
        res.status(400).json({error: 'Name, title, content, rating and bookId is required'}) 
        return; 
    }
    
    try {
        const newReview = new reviews({
            name: name,
            title: title,
            content: content, 
            rating: rating, 
            bookId
        });
        const savedReview = await newReview.save();

        await book.findByIdAndUpdate(bookId, {
            $push: {reviews: savedReview.id}
        })

        res.status(201).json({message: 'Review created', data: savedReview})
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({error: message})
    }
}

// PATCH review
export const updateReview = async (req: Request, res: Response) => {
    const { name, title, content, rating } = req.body;

    if (!name || !title || !content || !rating) {
        res.status(400).json({error: 'Name, title, content and rating is required'}) 
        return; 
    }

    try {
        const updateReview = await reviews.updateOne(
            {_id: req.params.id},
            {$set: {
                name: name,
                title: title,
                content: content, 
                rating: rating
                }
            }
        );
        if (updateReview.matchedCount == 0) {
            res.status(404).json({ message: 'No review with that ID was found' });
            return;
        }
        res.json({message: 'Review was sucsessfully updated', data: await reviews.findById(req.params.id)});

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
}

// DELETE review
export const deleteReview = async (req: Request, res: Response) => {
    try {
        const deletedreview = await reviews.deleteOne({_id: req.params.id})

        if (deletedreview.deletedCount === 0) {
            res.status(404).json({error: 'No review with that ID was found'})
            return;
        }
        res.json({message: 'Review deleted'})
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message :'Unknown error'
        res.status(500).json({error: message})
    }
}