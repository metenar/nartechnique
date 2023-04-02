import "./project.scss";

function Project({ item }) {
  return (
    <div className="projectcard">
      <img src={item.img} alt="" />
      <span>{item.title}</span>
    </div>
  );
}
export default Project;
