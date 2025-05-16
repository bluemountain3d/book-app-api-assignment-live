import { Request, Response } from "express";
import Book from "../../models/book";

export const fetchAllBooks = async (req: Request, res: Response) => {
  console.log('Call: fetchAllBooks()');

  try {
    const books = await Book.find();
    
    res.status(200).json(books);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({error: message});
  }
};