import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function Navbar() {
  const navigate = useNavigate();
  const { currentUser, updateUser } = useContext(AuthContext);
  const handleLogout = async () => {
    await apiRequest.post("/auth/logout");
    updateUser(null);
    navigate("/");
  };
  return (
    <nav>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <div className="logowraper">
              <span>Nar</span>
              <span>Technique</span>
            </div>
          </Link>
        </div>
        <div className="links">
          <Link to="/" className="link">
            <span className="home_link">Home</span>
          </Link>
          <Link to="/projects" className="link">
            <span className="projects">Projects</span>
          </Link>
          <Link to="/reviews" className="link">
            <span className="reviewLink">Reviews</span>
          </Link>
          <Link to="/contact" className="link">
            <span className="contacts">Contact Us</span>
          </Link>
          {currentUser && (
            <>
              {currentUser.isAdmin && (
                <Link to="/add" className="link">
                  <span className="add">New Review</span>
                </Link>
              )}
              <button className="logoutButton" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
          {!currentUser && (
            <>
              <Link to="/register" className="link">
                <span className="register">Sign Up</span>
              </Link>
              <Link to="/login" className="link">
                <span className="login">Sign In</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
