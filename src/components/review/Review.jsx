import "./review.scss";

function Review({ review }) {
  return (
    <div className="review">
      <div className="container">
        <h3 className="customer">{review.customer}</h3>
        <h4 className="title">{review.title}</h4>
        <p className="desc">{review.desc}</p>
        <span className="date">{review.date}</span>
      </div>
    </div>
  );
}
export default Review;
