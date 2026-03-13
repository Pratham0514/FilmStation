import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Rating from "../component/Rating";


function MovieDetails() {

  const { id } = useParams();
//तू useState मध्ये fields लिहिले नाही तरी code चालेल, कारण actual data API कडून येतो.
  const [movieDetails, setMovieDetails] = useState(null);

  {/*तू useState मध्ये fields लिहिले नाही तरी code चालेल, कारण actual data API कडून येतो.
    if u not like this in code
  const [movieDetails, setMovieDetails] = useState({
  _id: "",
  title: "",
  description: "",
  image: "",
  category: "",
  director: "",
  writer: "",
  year: "",
  language: "",
  rating: "",
  }); */}

  const loadMovieDetails = async () => {
    try {

      const response = await axios.get(
        `http://localhost:8080/movies/${id}`
      );

      setMovieDetails(response.data.data);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadMovieDetails();
  }, [id]);

  if (!movieDetails) {
    return (
      <div className="text-white text-center mt-20 text-xl">
        Loading...
      </div>
    );
  }


  const handleRatingClick = async (newRating) => {
    try {
      setMovieDetails({
                ...movieDetails,
                rating: newRating
              });
      await axios.patch(`http://localhost:8080/movies/${id}/rating`, { rating : newRating });
      
      loadMovieDetails();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex justify-center items-center p-6">

      <div className="max-w-3xl bg-gray-900 rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Image */}
        <div>
          <img
            src={movieDetails.image?.[0]}
            alt={movieDetails.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="p-8 flex flex-col justify-center">

          <h1 className="text-4xl font-bold mb-4">
            {movieDetails.title}
          </h1>

          <p className="text-gray-300 mb-6">
            {movieDetails.description}
          </p>

          <div className="space-y-2 text-gray-300">

            <p>
              <span className="text-white font-semibold">Category:</span>{" "}
              {movieDetails.category}
            </p>

            <p>
              <span className="text-white font-semibold">Director:</span>{" "}
              {movieDetails.director}
            </p>

            <p>
              <span className="text-white font-semibold">Year:</span>{" "}
              {movieDetails.year}
            </p>

            <p>
              <span className="text-white font-semibold">Language:</span>{" "}
              {movieDetails.language}
            </p>

         <div className="text-yellow-400 text-lg">
          <Rating
            rating={movieDetails.rating}
            onClick={(newRating) => {
              handleRatingClick(newRating);
            }}
          />
        </div>
          </div>

          <button className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition">
            ▶ Watch Trailer
          </button>

        </div>

      </div>

    </div>
  );
}

export default MovieDetails;