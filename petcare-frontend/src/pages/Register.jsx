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

    <div className="modern-auth-page">

      {/* THEME TOGGLE */}

      <div className="modern-auth-theme">
        <ThemeToggle />
      </div>


      {/* LEFT BRANDING PANEL */}

      <div className="auth-brand-panel">

        <div className="auth-brand-content">

          <Link
            to="/"
            className="auth-brand-logo"
          >
            <span className="auth-logo-icon">
              🐾
            </span>

            <span>
              PETCARE
            </span>
          </Link>


          <div className="auth-brand-message">

            <span className="auth-brand-eyebrow">
              START YOUR PETCARE JOURNEY
            </span>

            <h1>
              Better care starts
              <br />
              with being
              <br />
              <span>organized.</span>
            </h1>

            <p>
              Create your PetCare account and keep your
              pet's health information, appointments,
              vaccinations and reminders together.
            </p>

          </div>


          <div className="auth-feature-list">

            <div className="auth-feature-item">

              <div className="auth-feature-icon">
                🐶
              </div>

              <div>
                <strong>Pet Profiles</strong>
                <span>
                  Create and manage profiles for your pets.
                </span>
              </div>

            </div>


            <div className="auth-feature-item">

              <div className="auth-feature-icon">
                💉
              </div>

              <div>
                <strong>Vaccinations</strong>
                <span>
                  Track vaccines and upcoming due dates.
                </span>
              </div>

            </div>


            <div className="auth-feature-item">

              <div className="auth-feature-icon">
                📅
              </div>

              <div>
                <strong>Appointments</strong>
                <span>
                  Organize veterinary appointments.
                </span>
              </div>

            </div>


            <div className="auth-feature-item">

              <div className="auth-feature-icon">
                🔔
              </div>

              <div>
                <strong>Care Reminders</strong>
                <span>
                  Keep important pet-care tasks on schedule.
                </span>
              </div>

            </div>

          </div>

        </div>


        <div className="auth-decoration auth-decoration-one">
          🐾
        </div>

        <div className="auth-decoration auth-decoration-two">
          🐾
        </div>

      </div>


      {/* RIGHT REGISTRATION PANEL */}

      <div className="auth-form-panel">

        <div className="modern-login-card">

          <div className="mobile-auth-logo">
            🐾 PETCARE
          </div>


          <div className="auth-form-heading">

            <span className="auth-form-eyebrow">
              JOIN PETCARE
            </span>

            <h2>
              Create your account
            </h2>

            <p>
              Enter your information below to start
              managing your pet's care.
            </p>

          </div>


          <form
            className="modern-login-form"
            onSubmit={handleSubmit}
          >

            {/* NAME */}

            <div className="modern-auth-field">

              <label htmlFor="register-name">
                Full Name
              </label>

              <div className="auth-input-wrapper">

                <span className="auth-input-icon">
                  👤
                </span>

                <input
                  id="register-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />

              </div>

            </div>


            {/* EMAIL */}

            <div className="modern-auth-field">

              <label htmlFor="register-email">
                Email Address
              </label>

              <div className="auth-input-wrapper">

                <span className="auth-input-icon">
                  ✉️
                </span>

                <input
                  id="register-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="modern-auth-field">

              <label htmlFor="register-password">
                Password
              </label>

              <div className="auth-input-wrapper">

                <span className="auth-input-icon">
                  🔒
                </span>

                <input
                  id="register-password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />

              </div>

            </div>


            {/* SUCCESS MESSAGE */}

            {message && (

              <div className="modern-register-success">

                <span>✓</span>

                <p>
                  {message}
                </p>

              </div>

            )}


            {/* ERROR MESSAGE */}

            {error && (

              <div className="modern-login-error">

                <span>⚠️</span>

                <p>
                  {error}
                </p>

              </div>

            )}


            <button
              type="submit"
              className="modern-login-button"
            >
              Create Account
              <span>→</span>
            </button>

          </form>


          <div className="register-login-divider">
            <span>
              ALREADY REGISTERED?
            </span>
          </div>


          <Link
            to="/login"
            className="modern-login-link-button"
          >
            Sign In to Your Account
          </Link>


          <div className="auth-security-note">

            <span>🔒</span>

            <span>
              Your account information is securely protected.
            </span>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Register;