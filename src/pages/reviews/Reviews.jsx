import { Link, useLoaderData } from "react-router-dom";
import Review from "../../components/review/Review";
import "./reviews.scss";
import { useState } from "react";
import Pagination from "../../components/pagination/Pagination";
function Reviews() {
  const reviews = useLoaderData();
  const [currentPage, setCurrentPage] = useState(1); // Mevcut sayfa numarası
  const [reviewsPerPage] = useState(10); // Sayfa başına gösterilecek yorum sayısı

  // Şu anki sayfa için yorumları hesapla
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="reviews">
      <div className="container">
        <div className="top">
          <h3 className="title">REVIEWS</h3>
          <p className="desc">
            These are some reviews from verified customers. We have more then
            {" " + reviews.length} five stars reviews all around Bay Area.
          </p>
          {/*<div className="widget" id="tt-review-widget-star">
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
              <span className="rev"> {reviews.length} reviews</span>
            </div>
            <script src="https://www.thumbtack.com/profile/widgets/scripts/?service_pk=325208192815775813&widget_id=review&type=star"></script>
          </div>
          <Link
            target="_blank"
            to="https://www.thumbtack.com/ca/burlingame/furniture-assembly/nar-technique/service/325208192815775813"
            className="link button"
          >
            Read More
          </Link>*/}
        </div>
        <div className="bottom">
          {currentReviews.map((review) => (
            <Review review={review} />
          ))}
          <Pagination
            reviewsPerPage={reviewsPerPage}
            totalReviews={reviews.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}
export default Reviews;
