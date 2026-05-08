import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const dbUrl = process.env.MONGODB_URL;
    if (dbUrl) {
      await mongoose.connect(dbUrl);
    } else {
      console.log("No DB URL detected");
    }
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
