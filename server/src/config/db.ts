import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://localhost:27017/teahouse';
    await mongoose.connect(connStr);
    console.log(`[MongoDB] Connected successfully to ${connStr}`);
  } catch (error) {
    console.warn('[MongoDB] Local MongoDB connection failed. Running in memory fallback mode:', (error as Error).message);
  }
};
