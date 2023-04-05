import { Link } from "react-router-dom";
import Review from "../../components/review/Review";
import { reviews } from "../../data";
import "./reviews.scss";
function Reviews() {
  return (
    <div className="reviews">
      <div className="container">
        <div className="top">
          <h3 className="title">REVIEWS</h3>
          <p className="desc">
            These are some reviews from verified customers. We have more then
            220 five stars review all around Bay Area. if you want to check all
            reviews you can click the button.
          </p>
          <div className="widget" id="tt-review-widget-star">
            <img
              src="https://cdn.thumbtackstatic.com/fe-assets-web/media/logos/thumbtack/wordmark.svg"
              alt="Thumbtack"
              className="tt-logo"
            />
            <Link
              target="_blank"
              className="link"
              to="https://www.thumbtack.com/ca/burlingame/furniture-assembly/nar-technique/service/325208192815775813"
            >
              <div>NAR TECHNIQUE</div>
            </Link>
            <div id="tt-dynamic">
              <img src="https://cdn.thumbtackstatic.com/fe-assets-web/media/pages/profile/standard-widgets/review-widget/orange_star.svg" />
              <img src="https://cdn.thumbtackstatic.com/fe-assets-web/media/pages/profile/standard-widgets/review-widget/orange_star.svg" />
              <img src="https://cdn.thumbtackstatic.com/fe-assets-web/media/pages/profile/standard-widgets/review-widget/orange_star.svg" />
              <img src="https://cdn.thumbtackstatic.com/fe-assets-web/media/pages/profile/standard-widgets/review-widget/orange_star.svg" />
              <img src="https://cdn.thumbtackstatic.com/fe-assets-web/media/pages/profile/standard-widgets/review-widget/orange_star.svg" />
              <span className="rev"> 234 reviews</span>
            </div>
            <script src="https://www.thumbtack.com/profile/widgets/scripts/?service_pk=325208192815775813&widget_id=review&type=star"></script>
          </div>
          <Link
            target="_blank"
            to="https://www.thumbtack.com/ca/burlingame/furniture-assembly/nar-technique/service/325208192815775813"
            className="link button"
          >
            Read More
          </Link>
        </div>
        <div className="bottom">
          {reviews.map((review) => (
            <Review review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Reviews;
