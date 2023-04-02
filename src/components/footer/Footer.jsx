import { Link } from "react-router-dom";
import { FaLinkedin, FaFacebookSquare } from "react-icons/fa";
import { BiLinkAlt } from "react-icons/bi";
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
          <div className="toppro">
            <Link
              className="widget"
              to="https://www.thumbtack.com/ca/burlingame/furniture-assembly/nar-technique/service/325208192815775813"
              target="_blank"
            >
              <img
                style={{
                  height: 102 + "px",
                  width: 102 + "px",
                  color: "white",
                }}
                src="https://cdn.thumbtackstatic.com/fe-assets-web/media/pages/profile/standard-widgets/pro-svg/orange/2018.svg"
              />
              <script src="https://www.thumbtack.com/profile/widgets/scripts/?service_pk=325208192815775813&widget_id=profile"></script>
            </Link>
          </div>
        </div>
        <div className="bottom">
          <span className="copyright">&copy;2023 by NarTech. </span>
        </div>
      </div>
    </div>
  );
}
export default Footer;
