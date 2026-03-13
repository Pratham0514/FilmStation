// import React from 'react'

// function Rating({rating}) {
//   return (
//    <>
//     {Array.from({ length: Math.round(rating) }, (_, index) => (
//     <span key={"full-" + index}>⭐</span>
//     ))}

//      {Array.from({ length: 5 - Math.round(rating) }, (_, index) => (
//     <span key={"empty-" + index}>☆</span>
//   ))}
//    </>
//   )
// }

// export default Rating

import React from "react";

function Rating({ rating = 0, onClick }) {
  return (
    <>
      {Array.from({ length: 5 }, (_, index) => {
        const value = index + 1;

        return (
          <span
            key={index}
            className="cursor-pointer text-xl"
            onClick={() => onClick(value)}
          >
            {value <= rating ? "⭐" : "☆"}
          </span>
        );
      })}
    </>
  );
}

export default Rating;