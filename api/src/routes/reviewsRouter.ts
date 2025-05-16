import express from "express";

import { authenticate } from "../middleware/auth";
import {getAllreviews, 
        getReviewById, 
        addNewReview, 
        updateReview, 
        deleteReview } from "../controllers/reviewController";

const router = express.Router();

// Open endpoints
router.get('/', getAllreviews);
router.get('/:id', getReviewById);
router.post('/', addNewReview);

// // Closed endpoints
router.patch('/:id', authenticate, updateReview);
router.delete('/:id', authenticate, deleteReview);

export default router;