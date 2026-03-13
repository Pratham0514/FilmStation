import React from 'react'

function Rating({rating}) {
  return (
   <>
    {Array.from({ length: Math.round(rating) }, (_, index) => (
    <span key={"full-" + index}>⭐</span>
    ))}

     {Array.from({ length: 5 - Math.round(rating) }, (_, index) => (
    <span key={"empty-" + index}>☆</span>
  ))}
   </>
  )
}

export default Rating