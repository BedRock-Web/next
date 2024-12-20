import mongoose from "mongoose";
let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Database already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "janiNa",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true; // Update connection status
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error message:", error);
  }
};
