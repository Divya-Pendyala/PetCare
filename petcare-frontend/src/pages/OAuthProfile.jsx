import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getProfile
} from "../services/profileService";

function OAuthProfile() {

  const navigate = useNavigate();
  
  const [error, setError] = useState("");

  useEffect(() => {

    const loadProfile = async () => {

      try {

        const response =
          await getProfile();

        localStorage.setItem(
          "userName",
          response.data.name
        );

        localStorage.setItem(
          "userEmail",
          response.data.email
        );

        navigate(
          "/dashboard",
          { replace: true }
        );

      } 
	  catch (error) {

        console.error(
          "Google profile loading failed:",
          error
        );
		
		setError(
		    "Google login succeeded, but loading the PetCare profile failed. Check the browser console."
		  );
      }
    };

    loadProfile();

  }, [navigate]);

  return (

    <div className="oauth-loading-page">

      <div className="oauth-loading-card">

        <div className="oauth-logo">
          <span>🐾</span>
          PETCARE
        </div>


        {error ? (

          <div className="oauth-error-content">

            <div className="oauth-error-icon">
              !
            </div>

            <h2>
              Unable to load your profile
            </h2>

            <p>
              {error}
            </p>

            <button
              type="button"
              className="oauth-login-button"
              onClick={() =>
                navigate("/login")
              }
            >
              ← Return to Login
            </button>

          </div>

        ) : (

          <>

            <div className="oauth-loader">

              <div className="oauth-loader-paw">
                🐾
              </div>

            </div>


            <h2>
              Almost there!
            </h2>

            <p>
              Your Google account is connected.
              We're loading your PetCare profile.
            </p>


            <div className="oauth-progress">

              <div className="oauth-progress-step active">

                <span>✓</span>

                Google authentication

              </div>


              <div className="oauth-progress-line active"></div>


              <div className="oauth-progress-step active">

                <span>✓</span>

                Loading profile

              </div>

            </div>


            <small>
              Taking you to your dashboard...
            </small>

          </>

        )}

      </div>

    </div>

  );
}

export default OAuthProfile;