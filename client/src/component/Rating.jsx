import { Rating as StarRating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

function Rating({ rating = 0, onChange }) {
  return (
    <StarRating
      style={{ maxWidth: 120 }}
      value={rating}
      onChange={onChange}
    />
  );
}

export default Rating;