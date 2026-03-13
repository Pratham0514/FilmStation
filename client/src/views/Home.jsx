import axios from "axios"
import { useEffect, useState } from "react"
import MovieCard from "./../component/MovieCard"
function Home() {
  const [movies, setMovies] = useState([])

  const loadMovies =async ()=>{
    const response =await axios.get("http://localhost:8080/movies");
    setMovies(response.data.data);
  }
  useEffect(()=>{
    loadMovies();
  },[])
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black ">

  <div className="container mx-auto px-6 py-10">

    {/* Page Title */}
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-10 text-center tracking-wide">
      🎥 Movies 🍿
    </h1>

    {/* Movies Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 ">

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

</div>
  )
}

export default Home