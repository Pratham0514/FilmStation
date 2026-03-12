import Movie from "./../models/Movie.js";

// show all movies

const getMovies =async (req, res) => {
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
};

// Adding movie
const postMovies =async (req, res) => {
  try {

    console.log("Body response", req.body);

    const { title, description, image, category, director, year, language, rating } = req.body;

    //new Movie() म्हणजे: Database मध्ये save करण्यासाठी नवीन movie object तयार करणे
    const newMovie = new Movie({ title, description, image, category, director, year, language,rating, });

    // .save() = MongoDB मध्ये data insert करतो
    const savedMovie = await newMovie.save();

    res.status(201).json({
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
};
// /search?title=abc 
const getMoviesSearch = async (req, res) => {

  const { title } = req.query;

  let movies;

  if (!title) {
    movies = await Movie.find();   // title नसल्यास सर्व movies
  } else {
    movies = await Movie.find({
      $or: [
        { title: { $regex: title, $options: "i" } },
        { description: { $regex: title, $options: "i" } }
      ]
    });
  }

  if (movies.length === 0) {
    return res.status(404).json({
      success: false,
      data: null,
      message: "Movie not found",
    });
  } else {
    return res.json({
      success: true,
      data: movies,
      message: "Movie fetched successfully",
    });
  }
}



// find by id
const getMovieById = async (req, res) => {
 const { id } = req.params;
    try {
    const movie = await Movie.findById(id);

    if (movie) {
      return res.json({
        success: true,
        data: movie,
        message: "Movie fetched successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Movie not found",
      });
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

export { getMovies , postMovies ,getMovieById,getMoviesSearch};