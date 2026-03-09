import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import Movie from "./models/Movie.js";
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
app.post("/movie", async (req, res) => {
  try {

    console.log("Body response", req.body);

    const { title, description, image, category, director, year, language, rating } = req.body;

    //new Movie() म्हणजे: Database मध्ये save करण्यासाठी नवीन movie object तयार करणे
    const newMovie = new Movie({ title, description, image, category, director, year, language,rating, });

    // .save() = MongoDB मध्ये data insert करतो
    const savedMovie = await newMovie.save();

    res.json({
      status: "ok",
      message: "Movie added successfully",
      data: savedMovie,
    });

  } catch (error) {

    res.status(500).json({
      status: "error",
      message: error.message,
    });

  }
});


// show all movies

app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json({
      status: "ok",
      data: movies,
      message: "Movies fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
      
    });
  }
});






const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`\n ✅ Server is running on port ${PORT}`);
  connectDB();
});