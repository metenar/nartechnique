import React, { useEffect, useState } from "react";
import Project from "../../components/project/project";
import Slide from "../../components/slide/Slide";
import { sliders } from "../../data";
import "./projects.scss";

function Projects() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let showOption;
  if (windowSize.width >= 1200) {
    showOption = 30;
  } else if (windowSize.width >= 900 && windowSize.width < 1200) {
    showOption = 40;
  } else if (windowSize.width >= 650 && windowSize.width < 900) {
    showOption = 50;
  } else {
    showOption = 100;
  }
  console.log(showOption);
  return (
    <div className="projects1">
      <img src="./img/projects_base.png" alt="" />
      <div className="container">
        <div className="top">
          <div className="title">NAR TECHNIQUE: HOME IMPROVEMENT PRO</div>
          <span className="subtit">The Best in the Business</span>
          <p className="desc">
            Nar Technique will do any home improvement work you need. It can be
            tough to get great service for all those odd errands around the
            house you simply don’t have time for. Nar Technique understands that
            your growing “To Do” list can feel overwhelming. Call today and
            start feeling at ease — you’ll be glad you did.
          </p>
        </div>
        <div className="bottom">
          <h3 className="bottom_title">Some of my work</h3>
          <Slide slidesToShow={showOption} arrowsScroll={showOption}>
            {sliders.map((item) => (
              <Project item={item} key={item.id} />
            ))}
          </Slide>
        </div>
      </div>
    </div>
  );
}
export default Projects;
