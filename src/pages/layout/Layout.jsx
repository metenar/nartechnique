import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar.jsx";
import "./layout.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import Footer from "../../components/footer/Footer.jsx";

function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

function AuthLayout() {
  const { currentUser } = useContext(AuthContext);

  return !currentUser.isAdmin ? (
    <Navigate to="/" />
  ) : (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
export { Layout, AuthLayout };
