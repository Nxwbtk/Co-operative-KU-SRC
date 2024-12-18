import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to database");

  } catch (error) {
    console.error(error);
    console.error("Error connecting to database")
  }
};