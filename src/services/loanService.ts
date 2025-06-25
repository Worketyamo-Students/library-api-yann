import prisma from '../config/database';
import { LoanCreateInput } from '../types';
import { sendAvailabilityNotification, sendReturnReminder } from '../controllers/notificationController';

export const createLoan = async (loanData: LoanCreateInput) => {
  const book = await prisma.book.findUnique({ where: { id: loanData.bookId } });
  if (!book || book.status !== 'AVAILABLE') {
    throw new Error('Book not available');
  }

  const loan = await prisma.loan.create({
    data: {
      ...loanData,
      status: 'ACTIVE',
      borrowDate: new Date(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks
    },
  });

  await prisma.book.update({
    where: { id: loanData.bookId },
    data: { status: 'BORROWED' },
  });

  // Schedule return reminder
  setTimeout(() => sendReturnReminder(loan.id), 12 * 24 * 60 * 60 * 1000); // 12 days

  return loan;
};

export const returnLoan = async (loanId: string) => {
  const loan = await prisma.loan.update({
    where: { id: loanId },
    data: { 
      status: 'RETURNED',
      returnDate: new Date(),
    },
    include: { book: true },
  });

  await prisma.book.update({
    where: { id: loan.bookId },
    data: { status: 'AVAILABLE' },
  });

  // Check for reservations and send notifications
  const reservations = await prisma.reservation.findMany({
    where: { bookId: loan.bookId },
  });

  if (reservations.length > 0) {
    sendAvailabilityNotification(loan.bookId);
  }

  return loan;
};

export const getUserLoans = async (userId: string) => {
  return prisma.loan.findMany({
    where: { userId },
    include: { book: true },
  });
};