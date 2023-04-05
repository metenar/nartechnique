import "./features.scss";
function Features({ item }) {
  const typ = item.id % 2 == 0;
  return (
    <div className="features">
      <div className="container">
        {typ && (
          <>
            <div className="left">
              <h3 className="title">{item.title}</h3>
              <p className="desc">{item.desc}</p>
            </div>
            <div className="right">
              <img src={item.img} alt="" className="image" />
            </div>
          </>
        )}
        {!typ && (
          <>
            <div className="right">
              <img src={item.img} alt="" className="image" />
            </div>
            <div className="left">
              <h3 className="title">{item.title}</h3>
              <p className="desc">{item.desc}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default Features;
