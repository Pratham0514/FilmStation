import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);

    if (conn) {
      console.log("\n 📦 Connected to MongoDB ");
    }
  } catch (error) {
    console.log("MongoDB connection error ❌", error.message);
  }
};

app.get("/", (req, res) => {
  res.send({
    status: "ok",
    message: "Server is healthy",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`\n ✅ Server is running on port ${PORT}`);
  connectDB();
});