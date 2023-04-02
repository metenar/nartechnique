import { Link } from "react-router-dom";
import "./reviews.scss";
function Reviews() {
  return (
    <div className="reviews">
      <div className="container">
        <div className="top">
          <h3 className="title">REWIEVS</h3>
          <p className="desc">
            These are some reviews from verified customers. We have more then
            220 five stars review all around Bay Area. if you want to check all
            reviews you can click the button.
          </p>
          <Link
            to="https://www.thumbtack.com/ca/burlingame/furniture-assembly/nar-technique/service/325208192815775813"
            className="link"
          >
            Read More
          </Link>
        </div>
        <div className="bottom"></div>
      </div>
    </div>
  );
}
export default Reviews;
