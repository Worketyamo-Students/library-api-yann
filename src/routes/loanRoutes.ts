import express from 'express';
import * as loanController from '../controllers/loanController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authenticate, loanController.createLoan);
router.put('/:id/return', authenticate, loanController.returnLoan);
router.get('/user/:userId', authenticate, loanController.getUserLoans);

export default router;