import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import apiRequest from "../../lib/apiRequest";

export default function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsloading(true);
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsloading(false);
    }
  };
  return (
    <div className="Register">
      <span className="RegisterTitle">Register</span>
      <form className="RegisterForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter Your Username..."
        />
        <label>Email</label>
        <input type="text" name="email" placeholder="Enter Your Email..." />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password..."
        />
        <button disabled={isLoading} className="RegisterButton">
          Register
        </button>
        {error && <span>{error}</span>}
      </form>
      <button className="RegisterLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
    </div>
  );
}
