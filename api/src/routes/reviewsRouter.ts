import express from "express";

import {getAllreviews, 
        getReviewById, 
        addNewReview, 
        updateReview, 
        deleteReview } from "../controllers/reviewController.ts";

const router = express.Router();

// Open endpoints
router.get('/', getAllreviews);
router.get('/:id', getReviewById);
router.post('/', addNewReview);

// // (To be) Closed endpoints
router.patch('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;