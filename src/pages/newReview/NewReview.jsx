import { useState } from "react";
import "./newReview.scss";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
function NewReview() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    try {
      await apiRequest.post("/reviews", {
        user: inputs.customer,
        star: inputs.star,
        work: inputs.type,
        desc: inputs.desc,
        date: inputs.date,
      });
      navigate("/reviews");
    } catch (err) {
      setError(err);
    }
  };
  return (
    <div className="newReview">
      <div className="formContainer">
        <div className="wrapper">
          <h2>Add New Review</h2>
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="customer">Customer Name</label>
              <input type="text" id="customer" name="customer" />
            </div>
            <div className="item">
              <label htmlFor="star">Rating</label>
              <input type="text" id="star" name="star" />
            </div>
            <div className="item">
              <label htmlFor="type">Job Type</label>
              <input type="text" id="type" name="type" />
            </div>
            <div className="item">
              <label htmlFor="desc">Review</label>
              <input type="text" id="desc" name="desc" />
            </div>
            <div className="item">
              <label htmlFor="date">Date</label>
              <input type="text" id="date" name="date" />
            </div>
            <button className="sendButton">Add</button>
            {error && <span>{error}</span>}
          </form>
        </div>
      </div>
    </div>
  );
}
export default NewReview;
