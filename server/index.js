import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { getMovies , postMovies ,getMovieById} from "./controllers/movies.js";
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

// Health check
app.get("/", (req, res) => {
  res.send({
    status: "ok",
    message: "Server is healthy",
  });
});

// add movie
app.post("/movie",postMovies);

// show all movies

app.get("/movies",getMovies);

// find by id
app.get("/movie/:id", getMovieById);




const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`\n ✅ Server is running on port ${PORT}`);
  connectDB();
});