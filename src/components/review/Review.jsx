import Rating from "../rating/Rating";
import "./review.scss";

function Review({ review }) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return (
    <div className="review">
      <div className="container">
        <h3 className="customer">{review.user}</h3>
        <div className="starContainer">
          <Rating rating={review.star} />
        </div>
        <h4 className="title">{review.work}</h4>
        <p className="desc">{review.desc}</p>
        <span className="date">
          {new Date(review.date).toLocaleDateString("en-US", options)}
        </span>
      </div>
    </div>
  );
}
export default Review;
