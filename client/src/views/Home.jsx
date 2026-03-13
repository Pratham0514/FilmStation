import axios from "axios"
import { useEffect, useState } from "react"
import MovieCard from "./../component/MovieCard"
import toast, { Toaster } from 'react-hot-toast';
function Home() {
   const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [error , setError] = useState("");
  

  // Load all movies
  const loadMovies = async () => {
    const response = await axios.get("http://localhost:8080/movies");
    setMovies(response.data.data);
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
      `http://localhost:8080/movies/search?title=${search}`
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

    {/* Page Title */}
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-10 text-center tracking-wide">
      🎥 Movies 🍿
    </h1>

    {/* Search Box */}
    {/* Search Input */}
      <input
        type="text"
        placeholder="Search Movies"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="block bg-gray-800 text-white px-4 py-2 rounded-lg w-full md:w-1/2 lg:w-1/3 mb-10 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto"
      />
    {error ? (
      <p className="text-red-500 text-center text-2xl">{error}</p>
    ) : null}

    {/* Movies Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">

      {movies.map((movieObj) => {
        const { _id, title, image, category, year, rating } = movieObj;

        return (
          <MovieCard
            key={_id}
            title={title}
            image={image}
            category={category}
            year={year}
            rating={rating}
          />
        );
      })}

    </div>

  </div>
        <Toaster />
</div>
  )
}

export default Home