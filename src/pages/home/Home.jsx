import "./home.scss";
import Features from "../../components/features/Features";
import { services } from "../../data";

function Home() {
  return (
    <div className="home">
      <div className="container">
        <div className="about">
          <h1 className="title">NAR TECHNIQUE HANDYMAN SERVICES</h1>
          <h3 className="subtitle">Reliable. Trustworthy. Efficient.</h3>
          <p className="desc">
            Welcome to Nar Technique Handyman Services, your go-to provider of
            professional and reliable handyman solutions. With years of
            experience in the industry, we specialize in delivering top-quality
            maintenance, and installation services for both residential and
            commercial properties. Our team of skilled and knowledgeable
            technicians is equipped with the latest tools and techniques to
            handle any task, big or small. From electrical and plumbing work to
            and painting, we've got you covered. At Nar Technique Handyman
            Services, we pride ourselves on delivering exceptional customer
            service and exceeding your expectations. Contact us today to learn
            more about our services and how we can help you with your next
            project.
            <img
              src="./img/Screen Shot 2023-04-01 at 3.25.25 PM.png"
              alt=""
              className="about_img"
            />
          </p>
        </div>
        <div className="feature">
          {services.map((item) => (
            <Features item={item} key={item.id} />
          ))}
        </div>
        <div className="bottom">
          <img src="./img/home_bottom.png" alt="" className="bottom_img" />
        </div>
      </div>
    </div>
  );
}
export default Home;
