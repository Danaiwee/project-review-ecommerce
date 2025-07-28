import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected mongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error in connected mongoDB", error);
    process.exit(1);
  }
};
