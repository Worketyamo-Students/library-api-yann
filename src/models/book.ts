import { Book } from '@prisma/client';

export interface BookCreateInput {
  title: string;
  author: string;
  description?: string;
  publicationYear: number;
  isbn: string;
}

export interface BookUpdateInput {
  title?: string;
  author?: string;
  description?: string;
  publicationYear?: number;
  isbn?: string;
}