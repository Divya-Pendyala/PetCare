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
    <div className="page-container">
      <h2>Google Login</h2>
      <p>Completing Google login...</p>
    </div>
  );
}

export default OAuthSuccess;