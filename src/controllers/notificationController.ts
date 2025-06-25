import { Request, Response } from 'express';
import * as notificationService from '../services/notificationService';

export const sendAvailabilityNotification = async (bookId: string) => {
  try {
    await notificationService.sendAvailabilityNotification(bookId);
  } catch (error) {
    console.error('Error sending availability notification:', error);
  }
};

export const sendReturnReminder = async (loanId: string) => {
  try {
    await notificationService.sendReturnReminder(loanId);
  } catch (error) {
    console.error('Error sending return reminder:', error);
  }
};