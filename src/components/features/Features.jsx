import "./features.scss";
function Features({ item }) {
  return (
    <div className="features">
      <div className="container">
        <div className="left">
          <h3 className="title">{item.title}</h3>
          <p className="desc">{item.desc}</p>
        </div>
        <div className="right">
          <img src={item.img} alt="" className="image" />
        </div>
      </div>
    </div>
  );
}
export default Features;
