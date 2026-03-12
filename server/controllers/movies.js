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

    if(!title || !description || !image || !category || !director || !year || !language || !rating){
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }

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

// full update
const putMoviesById = async (req, res) => {
  const { id } = req.params;

  try {
    const { title, description, image, category, director, year, language, rating } = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { title, description, image, category, director, year, language, rating },
//{ new: true } हा option **Mongoose मध्ये वापरतात जेव्हा आपण
//findByIdAndUpdate() किंवा findOneAndUpdate() वापरतो.
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({
        status: "error",
        message: "Movie not found",
      });
    }

    res.status(200).json({
      status: "ok",
      message: "Movie updated successfully",
      data: updatedMovie,
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// partial update rating 
const patchMoviesRatingById =async (req, res) => {
  const { id } = req.params;
  try{

    const { rating } = req.body;
    if(rating < 0 || rating > 10){
      return res.status(400).json({
        status: "error",
        data: null,
        message: "Rating must be between 0 and 10",
      })
    }
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { rating },
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({
        status: "error",
        message: "Movie not found",
      });
    }

    res.status(200).json({
      status: "ok",
      message: "Movie updated successfully",
      data: updatedMovie,
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    })
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

// delete by id
const deleteMoviesById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);

    if (!deletedMovie) {
      return res.status(404).json({
        status: "error",
        message: "Movie not found",
      });
    }

    res.status(200).json({
      status: "ok",
      message: "Movie deleted successfully",
      data: deletedMovie,
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export { getMovies , postMovies ,getMovieById,getMoviesSearch ,putMoviesById ,patchMoviesRatingById ,deleteMoviesById};