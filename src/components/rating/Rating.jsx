function Rating({ rating }) {
  const stars = Array(5).fill(0);
  return (
    <div className="rating">
      {stars.map((_, index) => (
        <svg
          key={index}
          width="15"
          height="15"
          viewBox="0 0 20 20"
          fill={index + 1 <= rating ? "#FFD700" : "#E0E0E0"} // Color stars based on rating
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      ))}
    </div>
  );
}
export default Rating;
