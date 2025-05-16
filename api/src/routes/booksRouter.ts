import express from "express";
import {
  fetchAllBooks,
  fetchBookById,
  addNewBook,
  updateBookById,
  removeBookById
} from '../controllers/book/bookController';
const router = express.Router();
import { authenticate } from '../middleware/auth';

// Routes
router.get('/', fetchAllBooks);
router.get('/:id', fetchBookById);
router.post('/', authenticate, addNewBook);
router.patch('/:id', authenticate, updateBookById);
router.delete('/:id', authenticate, removeBookById);

export default router;