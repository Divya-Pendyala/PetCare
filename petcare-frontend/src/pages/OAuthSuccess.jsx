import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthSuccess() {

  const navigate = useNavigate();

  useEffect(() => {

    const params =
      new URLSearchParams(window.location.search);

    const token = params.get("token");
    const userId = params.get("userId");

    // If there is no token in the URL,
    // check whether one was already saved.
    if (!token) {

      const savedToken =
        localStorage.getItem("token");

      if (savedToken) {
        navigate(
          "/oauth-profile",
          { replace: true }
        );
        return;
      }

      console.error(
        "Google OAuth login did not return a JWT."
      );

      navigate(
        "/login",
        { replace: true }
      );

      return;
    }

    localStorage.setItem("token", token);

    if (userId) {
      localStorage.setItem(
        "userId",
        userId
      );
    }

    navigate(
      "/oauth-profile",
      { replace: true }
    );

  }, [navigate]);

  return (

    <div className="oauth-loading-page">

      <div className="oauth-loading-card">

        <div className="oauth-logo">
          <span>🐾</span>
          PETCARE
        </div>

        <div className="oauth-loader">
          <div className="oauth-loader-paw">
            🐾
          </div>
        </div>

        <h2>
          Signing you in
        </h2>

        <p>
          We're securely completing your Google login.
        </p>

        <div className="oauth-progress">

          <div className="oauth-progress-step active">
            <span>✓</span>
            Google authentication
          </div>

          <div className="oauth-progress-line"></div>

          <div className="oauth-progress-step">
            <span>2</span>
            Loading PetCare
          </div>

        </div>

        <small>
          Please wait. You will be redirected automatically.
        </small>

      </div>

    </div>

  );
}

export default OAuthSuccess;