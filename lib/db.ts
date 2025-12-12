import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://maheshkadam9298_db_user:sameer@cluster0.fif6re4.mongodb.net/?appName=Cluster0";

if (!MONGODB_URI) {
  throw new Error("❌ MongoDB connection string is missing.");
}

let isConnected: boolean = false; // For connection caching

export async function connectDB() {
  if (isConnected) {
    // Already connected → reuse for Next.js hot reload / route handlers
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      dbName: "tailor_app", // You can change this to any DB name you want
    });

    isConnected = db.connection.readyState === 1;

    console.log("✅ MongoDB Connected:", db.connection.host);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
