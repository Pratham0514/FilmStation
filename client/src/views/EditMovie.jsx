import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {CopyPlus} from "lucide-react"
import {Trash} from "lucide-react"
import axios from "axios"
import {toast} from "react-hot-toast"
function EditMovie() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState({
  _id: "",
  title: "",
  description: "",
  image: [],
  category: "",
  director: "",
  writer: "",
  year: "",
  language: "",
  rating: 0,
  NewMoviePoater: "",
  });

const EditMovie = async () => {
  try {
    const response = await axios.put(`http://localhost:8080/movies/${id}`, movieDetails);
    toast.success(response.data.message);
    console.log(response.data);
    setTimeout(() => {
      window.location.href = "/";
    },1500);
  } catch (error) {
    console.log(error);
  }
};
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
  if (id) {
    loadMovieDetails();
  }
}, [id]);
  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black p-6">

  <div className="w-full max-w-lg bg-gray-900 text-white rounded-2xl shadow-2xl p-8">

   <h1 className="text-3xl font-bold text-center mb-6">
  ✏️ Edit Movie
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

      {/*// Image imp */}
    <div className="flex flex-wrap gap-2">
  {movieDetails.image.map((image, index) => (
    <div key={index} className="relative inline-block">
      
      <img
        src={image}
        alt={`Image ${index}`}
        className="w-16 h-16 object-cover rounded-lg"
      />

      <Trash
        size={16}
        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full cursor-pointer hover:bg-red-600"
        onClick={() => {
          const newImages = movieDetails.image.filter((_, i) => i !== index);
          setMovieDetails({ ...movieDetails, image: newImages });
        }}
      />

    </div>
  ))}
</div>
        <div className="flex items-center gap-2">
    
      {/*// Image imp */}
        <input
            type="text"
            placeholder="Image URL"
            value={movieDetails.NewMoviePoater}
            onChange={(e) => setMovieDetails({ ...movieDetails, NewMoviePoater: e.target.value })}
            className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500 text-white"
        />

       <button
  className="bg-red-600 hover:bg-red-700 p-3 rounded-lg transition"
  onClick={() => {
    if (!movieDetails.NewMoviePoater) return;

    setMovieDetails({
      ...movieDetails,
      image: [...movieDetails.image, movieDetails.NewMoviePoater],
      NewMoviePoater: ""   // input clear
    });
  }}
>
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
        onChange={(e) =>
  setMovieDetails({
    ...movieDetails,
    rating: Number(e.target.value),
  })
}
        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
      />

      <button
        className="w-full bg-red-600 hover:bg-red-700 transition p-3 rounded-lg font-semibold"
        onClick={EditMovie}
      >
         Edit Movie
      </button>

    </div>

  </div>

</div>
  )
}

export default EditMovie