import { env } from "./env.js";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MondoDB connection Failed");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
