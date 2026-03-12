import { model , Schema } from "mongoose";

const movieSchema = new Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    image: { type: [String], required: true },
    category: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: Number, required: true },
    language: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 10 },
  },
  { timestamps: true }
);
{/*
    Movie = तुझा Mongoose Model
    हा model MongoDB मधील collection structure define करतो.
*/}
const Movie = model("Movie", movieSchema);

export default Movie;