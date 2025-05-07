import { Request, Response } from "express";
import Book from "../../models/book.ts";

export const addNewBook = async (req: Request, res: Response) => {
  console.log('Call: addNewBook()');

  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json({
      message: "Book added successfully",
      book: savedBook
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({error: message});
  }
};
