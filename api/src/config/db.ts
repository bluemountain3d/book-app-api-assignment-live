import mongoose from "mongoose";

const username = process.env.DB_USER || '';
const password = process.env.DB_PASSWORD || '';
const cluster = process.env.DB_CLUSTER || '';
const database = process.env.DB_DATABASE || '';

const uri = `mongodb+srv://${username}:${encodeURIComponent(password)}@${cluster}/${database}`;

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to database');
  } catch (error) {
    console.log('Connection to database failed:', error);
    process.exit(1);
  }
}