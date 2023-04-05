import Project from "../../components/project/project";
import Slide from "../../components/slide/Slide";
import { sliders } from "../../data";
import "./projects.scss";

function Projects() {
  let showOption;
  if (window.innerWidth >= 1200) {
    showOption = 4;
  } else if (window.innerWidth >= 900 && window.innerWidth < 1200) {
    showOption = 3;
  } else if (window.innerWidth >= 650 && window.innerWidth < 900) {
    showOption = 2;
  } else {
    showOption = 1;
  }
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
          <h3 className="bottom_title">Some of my works</h3>
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
