import mongoose from "mongoose";
let connected = false;
const conncetDB = async () => {
  mongoose.set("strictQuery", true);

  // I need to say if the data base was connceted, please don't run this

  if (connected) {
    console.log("mongodb is already connected");
    return;
  }
  try {
    console.log("connecting to mongodb...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
  }
};

export default conncetDB;
