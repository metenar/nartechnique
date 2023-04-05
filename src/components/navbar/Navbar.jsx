import { Link } from "react-router-dom";
import "./navbar.scss";

function Navbar() {
  return (
    <div className="navbar">
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
        </div>
      </div>
    </div>
  );
}
export default Navbar;
