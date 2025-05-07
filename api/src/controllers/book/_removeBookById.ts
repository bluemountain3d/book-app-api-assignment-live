import { Request, Response } from "express";
import Book from "../../models/book.ts";

export const removeBookById = async (req: Request, res: Response) => {
  console.log('Call: removeBookById()');

  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    
    if (!deletedBook) {
      res.status(404).json({ error: "Book not found" });
      return;
    }
    
    res.status(200).json({
      message: "Book deleted successfully"
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({error: message});
  }
};