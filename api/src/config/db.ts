import mongoose from "mongoose";
import 'dotenv/config'

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "");
    console.log('Connected to database');
  } catch (error) {
    console.log('Connection to database failed:', error);
    process.exit(1);
  }
}