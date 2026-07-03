import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strict", true);
  if (connected) {
    console.log("data base is connected!");
    return;
  }

  try {
    console.log("connecting to database...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("data base is connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
