import express from "express";
import {
  fetchAllBooks,
  fetchBookById,
  addNewBook,
  updateBookById,
  removeBookById
} from '../controllers/book/bookController.ts';
const router = express.Router();

// Routes
router.get('/', fetchAllBooks);
router.get('/:id', fetchBookById);
router.post('/', addNewBook); // Tokens
router.patch('/:id', updateBookById); // Tokens
router.delete('/:id', removeBookById); // Tokens

export default router;