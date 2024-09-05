import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { AuthContext } from "../../context/AuthContext.jsx";
import apiRequest from "../../lib/apiRequest.js";

export default function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsloading(true);
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });
      updateUser(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsloading(false);
    }
  };
  return (
    <div className="Login">
      <span className="LoginTitle">Login</span>
      <form onSubmit={handleSubmit} className="LoginForm">
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter Your Username..."
          name="username"
          required
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Your Password..."
          name="password"
        />
        <button disabled={isLoading} type="submit" className="LoginButton">
          Login
        </button>
        {error && <span>{error}</span>}
      </form>
      <button type="submit" className="LoginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
