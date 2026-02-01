import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGODB_URI);
    console.log("MONGODB Connected");
  } catch (error) {
    console.log("MONGODB error", error.message);
    process.exit(1);
  }
};
