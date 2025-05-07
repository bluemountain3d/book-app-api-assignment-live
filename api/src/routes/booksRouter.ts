import express from "express";
import {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBookById,
  removeBookById
} from '../controllers/bookController.ts';
const router = express.Router();

// Routes
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', addNewBook);
router.patch('/:id', updateBookById);
router.delete('/:id', removeBookById);

export default router;