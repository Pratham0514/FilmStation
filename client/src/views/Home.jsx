import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "./../component/MovieCard";
import toast, { Toaster } from 'react-hot-toast';
import  ErrorImg  from "./../assets/error.png";
import { Link } from "react-router-dom";

function Home() {
   const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [error , setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load all movies
const loadMovies = async () => {
  try {
    setLoading(true);

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/movies`
    );

    setMovies(response?.data?.data || []);
    setError("");
  } catch (error) {
    setMovies([]);
    setError("Failed to load movies");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadMovies();
  }, []);

  // Search movies
// Search movies
const searchMovies = async () => {
  try {
    toast.loading("Searching...", { id: "searching" });

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/movies/search?title=${search}`
    );

    toast.dismiss("searching");

    setMovies(response.data.data);
    setError("");
  } catch (error) {
    toast.dismiss("searching");
    toast.error(error.response.data.message || "Something went wrong" ,{ id: "searching" },{duration: 500});
    setMovies([]);
    setError(error.response.data.message || "Something went wrong");
  }
};

useEffect(() => {
  if (search.trim() !== "") {
    searchMovies();
  } else {
    loadMovies();
  }
}, [search]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-6 py-10">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-10 text-center">
          🎥 Movies 🍿
        </h1>

        {/* Add Button */}
        <Link
          to="/newmovie"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-2 right-2 md:top-6 md:right-6 z-50"
        >
          + Add
        </Link>

        {/* Search */}
        <input
          type="text"
          placeholder="Search Movies"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block bg-gray-800 text-white px-4 py-2 rounded-lg w-full md:w-1/2 lg:w-1/3 mb-10 mx-auto"
        />

        {/* Error UI */}
        {error && !loading && (
          <div className="text-center mt-10">
            <img src={ErrorImg} alt="Error" className="w-1/5 mx-auto mt-10" />
            <p className="text-red-500 text-2xl">{error}</p>
          </div>
        )}

        {/* 🔥 LOADING SKELETON */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-800 h-64 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          /* Movies Grid */
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
            {movies?.map((movieObj) => {
              const { _id, title, image, category, year, rating } = movieObj;

              return (
                <MovieCard
                  key={_id}
                  _id={_id}
                  title={title}
                  image={image}
                  category={category}
                  year={year}
                  rating={rating}
                  loadMovies={loadMovies}
                />
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && movies.length === 0 && !error && (
          <p className="text-center text-gray-400 mt-10">
            No movies found 🎬
          </p>
        )}
      </div>

      <Toaster />
    </div>
  );
}

export default Home