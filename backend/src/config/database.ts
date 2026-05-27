import mongoose from 'mongoose';
import { env } from './env';

export async function connectDatabase(): Promise<void> {
  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(env.mongoUri, {
      dbName: 'mploychek_db'
    });
    console.log(`MongoDB connected: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('MongoDB connection failed.');
    console.error(`Connection string: ${env.mongoUri}`);
    console.error(error);
    throw error;
  }
}
