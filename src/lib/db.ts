import mongoose from "mongoose";

let isConnected = false; // Track the connection status

const connectToDB = async () => {
  if (isConnected) {
    console.log("Already connected to MongoDB.");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL as string);

    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB Connected");
  } catch (e) {
    console.error("MongoDB connection error:", e);
    throw e; 
  }
};

export default connectToDB;
