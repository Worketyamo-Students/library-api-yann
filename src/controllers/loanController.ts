import { Request, Response } from 'express';
import * as loanService from '../services/loanService';
import { LoanCreateInput } from '../types';
import { AuthRequest } from '../middleware/authMiddleware';

export const createLoan = async (req: AuthRequest, res: Response) => {
  try {
    const loanData: LoanCreateInput = { ...req.body, userId: req.user!.id };
    const loan = await loanService.createLoan(loanData);
    res.status(201).json(loan);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: message });
  }
};

export const returnLoan = async (req: AuthRequest, res: Response) => {
  try {
    const loan = await loanService.returnLoan(req.params.id);
    res.json(loan);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: message });
  }
};

export const getUserLoans = async (req: AuthRequest, res: Response) => {
  try {
    const loans = await loanService.getUserLoans(req.params.userId);
    res.json(loans);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: message });
  }
};