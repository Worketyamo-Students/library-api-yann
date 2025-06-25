import prisma from '../config/database';
import { BookCreateInput, BookUpdateInput } from '../types';
import { sendAvailabilityNotification } from '../controllers/notificationController';

export const getAllBooks = async () => {
  return prisma.book.findMany();
};

export const createBook = async (bookData: BookCreateInput) => {
  return prisma.book.create({
    data: { ...bookData, status: 'AVAILABLE' },
  });
};

export const updateBook = async (bookId: string, bookData: BookUpdateInput) => {
  return prisma.book.update({
    where: { id: bookId },
    data: bookData,
  });
};

export const deleteBook = async (bookId: string) => {
  await prisma.book.delete({ where: { id: bookId } });
};