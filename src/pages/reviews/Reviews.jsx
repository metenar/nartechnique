import { useLoaderData } from "react-router-dom";
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
        </div>
        <div className="bottom">
          {currentReviews.map((review) => (
            <Review review={review} key={review.id} />
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
