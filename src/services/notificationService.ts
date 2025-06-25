import nodemailer from 'nodemailer';
import prisma from '../config/database';

export const sendAvailabilityNotification = async (bookId: string) => {
  const reservations = await prisma.reservation.findMany({
    where: { bookId },
    include: { user: true },
  });

  const book = await prisma.book.findUnique({ where: { id: bookId } });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  for (const reservation of reservations) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: reservation.user.email,
      subject: 'Book Available Notification',
      text: `The book "${book?.title}" is now available!`,
    });

    await prisma.reservation.delete({ where: { id: reservation.id } });
  }
};

export const sendReturnReminder = async (loanId: string) => {
  const loan = await prisma.loan.findUnique({
    where: { id: loanId },
    include: { user: true, book: true },
  });

  if (!loan || loan.status !== 'ACTIVE') return;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: loan.user.email,
    subject: 'Book Return Reminder',
    text: `Please return the book "${loan.book.title}" by ${loan.dueDate.toDateString()}`,
  });
};