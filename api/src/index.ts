import 'dotenv/config';
import express from 'express';
import cors from 'cors';
// import usersRouter from './routes/usersRouter.ts';
import booksRouter from './routes/booksRouter.ts';
import reviewsRouter from './routes/reviewsRouter.ts';
import { connectToDatabase } from './config/db.ts';
import userRoutes from './routes/userRouter.ts';

const app = express();

// Midlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/users', userRoutes);
app.use('/books', booksRouter);
app.use('/reviews', reviewsRouter);

// Connect to database
connectToDatabase();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})