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

    <div className="modern-auth-page">

      {/* THEME TOGGLE */}

      <div className="modern-auth-theme">
        <ThemeToggle />
      </div>


      {/* LEFT BRANDING SIDE */}

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
              YOUR PET. YOUR FAMILY.
            </span>

            <h1>
              Everything your pet
              <br />
              needs, all in
              <br />
              <span>one place.</span>
            </h1>

            <p>
              Keep your pet's health, appointments,
              vaccinations and daily care organized
              with PetCare.
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
                  Keep all your pet information together.
                </span>
              </div>

            </div>


            <div className="auth-feature-item">

              <div className="auth-feature-icon">
                💉
              </div>

              <div>
                <strong>Vaccination Tracking</strong>
                <span>
                  Manage vaccination history and due dates.
                </span>
              </div>

            </div>


            <div className="auth-feature-item">

              <div className="auth-feature-icon">
                📅
              </div>

              <div>
                <strong>Vet Appointments</strong>
                <span>
                  Organize upcoming veterinary visits.
                </span>
              </div>

            </div>


            <div className="auth-feature-item">

              <div className="auth-feature-icon">
                ❤️
              </div>

              <div>
                <strong>Health Records</strong>
                <span>
                  Store important medical information.
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


      {/* RIGHT LOGIN SIDE */}

      <div className="auth-form-panel">

        <div className="modern-login-card">

          <div className="mobile-auth-logo">
            🐾 PETCARE
          </div>


          <div className="auth-form-heading">

            <span className="auth-form-eyebrow">
              WELCOME BACK
            </span>

            <h2>
              Sign in to PetCare
            </h2>

            <p>
              Enter your account information to
              continue managing your pets.
            </p>

          </div>


          <form
            className="modern-login-form"
            onSubmit={handleSubmit}
          >

            <div className="modern-auth-field">

              <label htmlFor="login-email">
                Email Address
              </label>

              <div className="auth-input-wrapper">

                <span className="auth-input-icon">
                  ✉️
                </span>

                <input
                  id="login-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />

              </div>

            </div>


            <div className="modern-auth-field">

              <label htmlFor="login-password">
                Password
              </label>

              <div className="auth-input-wrapper">

                <span className="auth-input-icon">
                  🔒
                </span>

                <input
                  id="login-password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />

              </div>

            </div>


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
              Sign In
              <span>→</span>
            </button>

          </form>


          <div className="modern-oauth-divider">

            <span>
              OR CONTINUE WITH
            </span>

          </div>


          <button
            type="button"
            className="modern-google-button"
            onClick={handleGoogleLogin}
          >

            <span className="google-letter">
              G
            </span>

            <span>
              Continue with Google
            </span>

          </button>


          <div className="modern-register-prompt">

            <span>
              Don't have a PetCare account?
            </span>

            <Link to="/register">
              Create Account
            </Link>

          </div>


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

export default Login;