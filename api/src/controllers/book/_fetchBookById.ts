import { Request, Response } from "express";
import Book from "../../models/book";

export const fetchBookById = async (req: Request, res: Response) => {
  console.log('Call: fetchBookById()');

  try {
    const book = await Book.findById(req.params.id).populate('reviews');
    
    if (!book) {
      res.status(404).json({ error: "Book not found" });
      return;
    }
    
    res.status(200).json(book);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({error: message});
  }
};