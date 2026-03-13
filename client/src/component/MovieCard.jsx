

function MovieCard({ _id,title, image, category, year, rating }) {
  return (
    <div className="group  relative bg-gray-900 text-white rounded-2xl overflow-hidden shadow-xl  
w-full sm:w-64 md:w-72 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl  border-2 border-gray-800">

  {/* Movie Poster */}
  <div className="overflow-hidden">
    <img
      src={image}
      alt={title}
      className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-500"
    />
  </div>

  {/* Rating Badge */}
  <div className="absolute top-3 right-3 bg-gray-400 text-black text-sm font-bold px-3 py-1 rounded-lg shadow">
  {Array.from({ length: Math.round(rating) }, (_, index) => (
    <span key={"full-" + index}>⭐</span>
  ))}

  {Array.from({ length: 5 - Math.round(rating) }, (_, index) => (
    <span key={"empty-" + index}>☆</span>
  ))}
</div>

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

  {/* Movie Info */}
  <div className="relative p-4">

    <h1 className="text-lg font-bold truncate">
      {title}
    </h1>

    <p className="text-sm text-gray-400 mt-1">
      🎬 {category}
    </p>

    <div className="flex justify-between items-center mt-3 text-sm">

      <span className="text-gray-300">
        📅 {year}
      </span>

      <span className="bg-gray-700 px-2 py-1 rounded-md text-xs">
        Movie
      </span>

    </div>

  </div>

</div>
  )
}

export default MovieCard