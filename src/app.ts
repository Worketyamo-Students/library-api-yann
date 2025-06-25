import express from 'express';
import authRoutes from './routes/authRoutes';
import bookRoutes from './routes/bookRoutes';
import loanRoutes from './routes/loanRoutes';

const app = express();

app.use(express.json());

app.use('/users', authRoutes);
app.use('/books', bookRoutes);
app.use('/loans', loanRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;