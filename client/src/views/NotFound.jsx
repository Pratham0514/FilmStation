import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white px-6">

      <div className="text-center max-w-xl">

        {/* Movie Icon */}
        <div className="text-6xl mb-6 animate-pulse">
          🎬
        </div>

        {/* 404 */}
        <h1 className="text-9xl font-extrabold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          404
        </h1>

        {/* Title */}
        <h2 className="text-3xl font-semibold mt-4 tracking-wide">
          This Scene Doesn't Exist
        </h2>

        {/* Description */}
        <p className="text-gray-400 mt-4 leading-relaxed">
          The page you’re looking for might have been removed,
          renamed, or never made it to the final cut.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-10 flex-wrap">

  <Link
    to="/"
    className="px-8 py-3 rounded-full font-semibold text-white 
    bg-gradient-to-r from-[#4E8D9C] to-[#85C79A] 
    shadow-lg shadow-[#4E8D9C]/40
    hover:scale-110 hover:shadow-xl 
    transition-all duration-300"
  >
    🍿 Back to Home
  </Link>

  <button
    onClick={() => window.history.back()}
    className="px-8 py-3 rounded-full font-semibold 
    border border-[#85C79A] text-[#85C79A]
    backdrop-blur-md bg-white/5
    hover:bg-[#85C79A] hover:text-[#281C59]
    hover:scale-110 transition-all duration-300"
  >
    ⬅ Go Back
  </button>

</div>

        {/* Bottom cinematic line */}
        <p className="text-gray-600 text-sm mt-10 tracking-widest">
          ERROR • SCENE_NOT_FOUND
        </p>

      </div>

    </div>
  );
}

export default NotFound;