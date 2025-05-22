import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectToDatabase } from './config/db';
import booksRouter from './routes/booksRouter';
import reviewsRouter from './routes/reviewsRouter';
import userRoutes from './routes/userRouter';
import authRouter from './routes/authRouter';


const app = express();

// Midlewares
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://book-app-client-egileskilsson.vercel.app',
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
  console.log(`Server running at ${PORT}`)
})