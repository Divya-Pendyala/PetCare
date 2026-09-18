import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import api from "../api/axiosConfig";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      await api.post("/auth/register", formData);

      setMessage("Registration successful.");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      if (err.response?.data) {
        if (err.response.data.error) {
          setError(err.response.data.error);
        } else {
          const validationErrors =
            Object.values(err.response.data).join(", ");

          setError(validationErrors);
        }
      } else {
        setError("Unable to connect to the server.");
      }
    }
  };

  return (
	<div className="auth-container">

	   <div className="auth-theme-toggle">
	     <ThemeToggle />
	   </div>

	   <div className="auth-card">

        <h1>PetCare</h1>
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>

          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />

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
            Register
          </button>

        </form>

        {message && (
          <p className="success-message">
            {message}
          </p>
        )}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <p>
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;