import express from 'express';
import * as bookController from '../controllers/bookController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', bookController.getBooks);
router.post('/', authenticate, bookController.createBook);
router.put('/:id', authenticate, bookController.updateBook);
router.delete('/:id', authenticate, bookController.deleteBook);

export default router;