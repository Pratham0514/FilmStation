import { Link } from "react-router-dom";
import Rating from "./Rating";
import { Trash } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

function MovieCard({ _id, title, image, category, year, rating, loadMovies }) {

  const deleteMovie = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/movies/${id}`);

      toast.success("Movie Deleted Successfully");

      loadMovies(); // reload movies list
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  return (
      
    <Link
      to={`/movie/${_id}`}
      className="group relative bg-gray-900 text-white rounded-2xl overflow-hidden shadow-xl
      w-full sm:w-64 md:w-72 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl border-2 border-gray-800"
    >

      <div className="relative overflow-hidden">

        <img
          src={image?.[0]}
          alt={title}
          className="w-full h-80 object-cover"
        />

        {/* DELETE BUTTON */}
        <button
          className="absolute top-3 left-3 bg-red-600 p-2 rounded-full hover:bg-red-700"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteMovie(_id);
          }}
        >
          <Trash size={18} className="text-white" />
        </button>

      </div>
       <div className="absolute top-3 right-3 bg-gray-300 text-black text-sm font-bold px-3 py-1 rounded-lg shadow">
        <Rating rating={rating} />
      </div>

      <div className="relative p-4">
        <h1 className="text-lg font-bold">{title}</h1>
        <p className="text-sm text-gray-400">🎬 {category}</p>

        <div className="flex justify-between mt-3 text-sm">
          <span>📅 {year}</span>
          
        </div>
      </div>

    </Link>
  );
}

export default MovieCard;