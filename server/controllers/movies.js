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

// show all movies
const postMovies =async (req, res) => {
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
};

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
      return res.json({
        success: false,
        data: null,
        message: "Movie not found",
      });
    }

  } catch (error) {
    return res.json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

export { getMovies , postMovies ,getMovieById };