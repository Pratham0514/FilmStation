import { model , Schema } from "mongoose";

const movieSchema = new Schema({
    title: { type: String},
    description: { type: String},
    image: { type: [String]},
    category: { type: String},
    director: { type: String},
    year: { type: Number},
    language: { type: String},
    rating: { type: Number}
});

{/*
    Movie = तुझा Mongoose Model
    हा model MongoDB मधील collection structure define करतो.
*/}
const Movie = model("Movie", movieSchema);

export default Movie;