import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaLinkedin, FaFacebookSquare } from "react-icons/fa";
import { BiLinkAlt } from "react-icons/bi";
import { FiHexagon } from "react-icons/fi";
import "./footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="social">
            <Link to="https://facebook.com" className="link">
              <FaFacebookSquare />
            </Link>
            <Link to="https://linkedin.com" className="link">
              <FaLinkedin />
            </Link>
            <Link
              to="https://www.thumbtack.com/-Burlingame-CA/service/3581237"
              className="link"
            >
              <BiLinkAlt />
            </Link>
          </div>
          <IconContext.Provider
            value={{
              color: "gold",
              size: "4em",
              className: "global-class-name",
            }}
          >
            <div className="toppro">
              <div className="topproContainer">
                <FiHexagon />
                <div className="textContainer">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 20 20"
                    fill="#FFD700"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                  <span>Top Pro</span>
                  <span>2018</span>
                </div>
              </div>

              <div className="topproContainer">
                <FiHexagon />
                <div className="textContainer">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 20 20"
                    fill="#FFD700"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                  <span>Top Pro</span>
                  <span>2019</span>
                </div>
              </div>
              <div className="topproContainer">
                <FiHexagon />
                <div className="textContainer">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 20 20"
                    fill="#FFD700"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                  <span>Top Pro</span>
                  <span>2020</span>
                </div>
              </div>
              <div className="topproContainer">
                <FiHexagon />
                <div className="textContainer">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 20 20"
                    fill="#FFD700"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                  <span>Top Pro</span>
                  <span>2022</span>
                </div>
              </div>
              <div className="topproContainer">
                <FiHexagon />
                <div className="textContainer">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 20 20"
                    fill="#FFD700"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                  <span>Top Pro</span>
                  <span>2023</span>
                </div>
              </div>
              <div className="topproContainer">
                <FiHexagon />
                <div className="textContainer">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 20 20"
                    fill="#FFD700"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                  <span>Top Pro</span>
                  <span>2024</span>
                </div>
              </div>
            </div>
          </IconContext.Provider>
        </div>
        <div className="bottom">
          <span className="copyright">&copy;2023 by NarTech. </span>
        </div>
      </div>
    </div>
  );
}
export default Footer;
