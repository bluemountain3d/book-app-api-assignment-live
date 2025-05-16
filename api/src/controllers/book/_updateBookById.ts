import { Request, Response } from "express";
import Book from "../../models/book";

export const updateBookById = async (req: Request, res: Response) => {
  console.log('Call: updateBookById()');

  try {
    const { id } = req.params;

    const allowedUpdates = ['title', 'description', 'author', 'genres', 'image', 'published_year'];
    const updateData: Record<string, any> = {};

    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updateData[key] = req.body[key];
      }
    });

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    
    if (!updatedBook) {
      res.status(404).json({ error: "Book not found" });
      return;
    }
    
    res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({error: message});
  }
};