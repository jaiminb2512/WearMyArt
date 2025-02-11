import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnect = async () => {
  try {
    const connected = await mongoose.connect(process.env.MONGO_URL);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    // Log the error message and stack trace
    console.error("Failed to connect to MongoDB:", error.message);
  }
};

export default dbConnect;
