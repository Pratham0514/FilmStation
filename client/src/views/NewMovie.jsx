import { useState } from 'react'
import {CopyPlus} from "lucide-react"
function NewMovie() {
    const [movieDetails, setMovieDetails] = useState({
  title: "",
  description: "",
  image: "",
  category: "",
  director: "",
  writer: "",
  year: "",
  language: "",
  rating: 0,
  });
  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black p-6">

  <div className="w-full max-w-lg bg-gray-900 text-white rounded-2xl shadow-2xl p-8">

    <h1 className="text-3xl font-bold text-center mb-6">
      🎬 Add New Movie
    </h1>

    <div className="space-y-4">

      <input
        type="text"
        placeholder="Title"
        value={movieDetails.title}
        onChange={(e) => setMovieDetails({ ...movieDetails, title: e.target.value })}
        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
      />

      <textarea
        placeholder="Description"
        rows="3"
        value={movieDetails.description}
        onChange={(e) => setMovieDetails({ ...movieDetails, description: e.target.value })}
        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
      ></textarea>
    
        <div className="flex items-center gap-2">
        <input
            type="text"
            placeholder="Image URL"
            value={movieDetails.image}
            onChange={(e) => setMovieDetails({ ...movieDetails, image: e.target.value })}
            className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500 text-white"
        />

        <button className="bg-red-600 hover:bg-red-700 p-3 rounded-lg transition">
            <CopyPlus size={20} />
        </button>
        </div>
      <input
        type="text"
        placeholder="Category"
        value={movieDetails.category}
        onChange={(e) => setMovieDetails({ ...movieDetails, category: e.target.value })}
        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
      />

      <input
        type="text"
        placeholder="Director"
        value={movieDetails.director}
        onChange={(e) => setMovieDetails({ ...movieDetails, director: e.target.value })}
        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
      />

      <input
        type="text"
        placeholder="Writer"
        value={movieDetails.writer}
        onChange={(e) => setMovieDetails({ ...movieDetails, writer: e.target.value })}
        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
      />

      <div className="grid grid-cols-2 gap-4">

        <input
          type="text"
          placeholder="Year"
          value={movieDetails.year}
          onChange={(e) => setMovieDetails({ ...movieDetails, year: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
        />

        <input
          type="text"
          placeholder="Language"
          value={movieDetails.language}
          onChange={(e) => setMovieDetails({ ...movieDetails, language: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
        />

      </div>

      <input
        type="number"
        placeholder="Rating"
        value={movieDetails.rating}
        onChange={(e) => setMovieDetails({ ...movieDetails, rating: e.target.value })}
        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
      />

      <button
        className="w-full bg-red-600 hover:bg-red-700 transition p-3 rounded-lg font-semibold"
      >
        ➕ Add Movie
      </button>

    </div>

  </div>

</div>
  )
}

export default NewMovie