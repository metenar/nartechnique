import "./pagination.scss";

function Pagination({ reviewsPerPage, totalReviews, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalReviews / reviewsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="paginate">
      <div className="pageNumbers">
        {pageNumbers.map((number) => (
          <div
            className={currentPage === number ? "numbers active" : "numbers"}
            key={number}
          >
            <button onClick={() => paginate(number)}>{number}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Pagination;
