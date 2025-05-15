import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectToDatabase } from './config/db.ts';
import booksRouter from './routes/booksRouter.ts';
import reviewsRouter from './routes/reviewsRouter.ts';
import userRoutes from './routes/userRouter.ts';
import authRouter from './routes/authRouter.ts';


const app = express();

// Midlewares
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true   
}));
app.use(cookieParser());

// Routes
app.use('/users', userRoutes);
app.use('/books', booksRouter);
app.use('/reviews', reviewsRouter);
app.use('/auth', authRouter);

// Connect to database
connectToDatabase();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})