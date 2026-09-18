import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import api from "../api/axiosConfig";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    try {
      const response =
        await api.post("/auth/login", formData);

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "userId",
        response.data.userId
      );

      localStorage.setItem(
        "userName",
        response.data.name
      );

      localStorage.setItem(
        "userEmail",
        response.data.email
      );

      navigate("/dashboard");

    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };
  
  const handleGoogleLogin = () => {

    window.location.href =
      "http://localhost:8081/oauth2/authorization/google";

  };

  return (
    <div className="auth-container">

      <div className="auth-theme-toggle">
        <ThemeToggle />
      </div>

      <div className="auth-card">

        <h1>PetCare</h1>

        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <label>Password</label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          <button type="submit">
            Login
          </button>

        </form>
		
		<div className="oauth-divider">
		  <span>OR</span>
		</div>

		<button
		  type="button"
		  className="google-login-button"
		  onClick={handleGoogleLogin}
		>
		  Continue with Google
		</button>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <p>
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;