import { Request, Response } from 'express';
import * as bookService from '../services/bookService';
import { BookCreateInput, BookUpdateInput } from '../types';
import { AuthRequest } from '../middleware/authMiddleware'; 

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: message });
  }
};

export const createBook = async (req: AuthRequest, res: Response) => {
  try {
    const bookData: BookCreateInput = req.body;
    const book = await bookService.createBook(bookData);
    res.status(201).json(book);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: message });
  }
};

export const updateBook = async (req: AuthRequest, res: Response) => {
  try {
    const bookData: BookUpdateInput = req.body;
    const book = await bookService.updateBook(req.params.id, bookData);
    res.json(book);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: message });
  }
};

export const deleteBook = async (req: AuthRequest, res: Response) => {
  try {
    await bookService.deleteBook(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: message });
  }
};