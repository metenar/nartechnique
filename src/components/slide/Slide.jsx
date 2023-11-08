import "./slide.scss";
import Carousel from "infinite-react-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";

function Slide({ children, slidesToShow, arrowsScroll }) {
  const options = {
    autoPlayInterval: 1000,
    arrows: true,
    dots: false,
    initialSlide: 2,
    className: "carousel",
  };
  return (
    <div className="slide">
      <div className="container">
        <Carousel
          {...options}
          // // slidesToShow={slidesToShow}
          // // arrowsScroll={arrowsScroll}
          // // adaptiveHeight={true}
          // centerMode={true}
          // centerSlidePercentage={slidesToShow}
          // // dynamicHeight={true}
          // // axis={"horizontal"}
          // showStatus={false}
          // showIndicators={false}
          // infiniteLoop={true}
          // // centerPadding={50}
        >
          {children}
        </Carousel>
      </div>
    </div>
  );
}

export default Slide;
