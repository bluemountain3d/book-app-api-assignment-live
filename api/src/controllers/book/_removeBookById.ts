import { Request, Response } from "express";
import Book from "../../models/book.ts";

export const removeBookById = async (req: Request, res: Response) => {
  console.log('Call: removeBookById()');

  try {
    
  } catch (error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({error: message});
  }
};