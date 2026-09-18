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
    <div className="page-container">
      <h2>PetCare</h2>

	  {error ? (
	          <p>{error}</p>
	        ) : (
	          <p>Loading your Google profile...</p>
	        )}
    </div>
  );
}

export default OAuthProfile;