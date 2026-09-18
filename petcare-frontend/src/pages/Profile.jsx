import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PetCareLayout from "../components/PetCareLayout";
import {
  getProfile,
  updateProfile,
} from "../services/profileService";

function Profile() {
  const navigate = useNavigate();

  const [originalEmail, setOriginalEmail] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadProfile = async () => {
    try {
      const response = await getProfile();

      setFormData({
        name: response.data.name || "",
        email: response.data.email || "",
        profileImage:
          response.data.profileImage || "",
      });

      setOriginalEmail(
        response.data.email || ""
      );

      setError("");
    } catch (err) {
      setError("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]:
        event.target.value,
    });
  };

  const clearLoginData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      const response =
        await updateProfile(formData);

      const emailChanged =
        originalEmail !== response.data.email;

      if (emailChanged) {
        clearLoginData();

        alert(
          "Your email was updated successfully. Please log in again with your new email."
        );

        navigate("/login");
        return;
      }

      localStorage.setItem(
        "userName",
        response.data.name
      );

      localStorage.setItem(
        "userEmail",
        response.data.email
      );

      setFormData({
        name: response.data.name || "",
        email: response.data.email || "",
        profileImage:
          response.data.profileImage || "",
      });

      setOriginalEmail(
        response.data.email || ""
      );

      setMessage(
        "Profile updated successfully."
      );

    } catch (err) {
      if (err.response?.data) {
        if (err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError(
            Object.values(
              err.response.data
            ).join(", ")
          );
        }
      } else {
        setError("Unable to update profile.");
      }
    }
  };

  if (loading) {
    return (

      <PetCareLayout>

        <div className="profile-loading">

          <div className="profile-loading-icon">
            👤
          </div>

          <h3>Loading Profile</h3>

          <p>
            Getting your PetCare account information...
          </p>

        </div>

      </PetCareLayout>

    );
  }

  return (
	<PetCareLayout>

	   <div className="modern-page">

	   <div className="modern-page-header">

	     <div>

	       <span className="page-eyebrow">
	         ACCOUNT SETTINGS
	       </span>

	       <h1>
	         My Profile 👤
	       </h1>

	       <p>
	         View and manage your PetCare account information.
	       </p>

	     </div>

	     <Link
	       to="/dashboard"
	       className="modern-back-button profile-back-button"
	     >
	       ← Dashboard
	     </Link>

	   </div>

	   <div className="profile-layout modern-profile-layout">

	   <div className="profile-preview modern-profile-preview">

	     <div className="profile-cover">

	       <span>🐾</span>

	     </div>


	     <div className="modern-profile-photo">

	       {formData.profileImage ? (

	         <img
	           src={formData.profileImage}
	           alt={formData.name}
	         />

	       ) : (

	         <div className="modern-profile-placeholder">

	           {formData.name
	             ? formData.name
	                 .charAt(0)
	                 .toUpperCase()
	             : "U"}

	         </div>

	       )}

	     </div>


	     <h2>
	       {formData.name || "PetCare User"}
	     </h2>

	     <p className="profile-email">
	       {formData.email}
	     </p>


	     <span className="profile-member-badge">
	       🐾 PetCare Member
	     </span>


	     <div className="profile-info-divider"></div>


	     <div className="profile-info-row">

	       <span>👤</span>

	       <div>

	         <small>ACCOUNT NAME</small>

	         <strong>
	           {formData.name || "Not provided"}
	         </strong>

	       </div>

	     </div>


	     <div className="profile-info-row">

	       <span>✉️</span>

	       <div>

	         <small>EMAIL ADDRESS</small>

	         <strong>
	           {formData.email || "Not provided"}
	         </strong>

	       </div>

	     </div>

	   </div>

	   <div className="profile-form-card modern-profile-form-card">

	     <div className="modern-card-heading">

	       <div className="modern-card-icon profile-form-icon">
	         ✏️
	       </div>

	       <div>

	         <h2>
	           Edit Profile
	         </h2>

	         <p>
	           Update your personal PetCare account information.
	         </p>

	       </div>

	     </div>

          <form
            className="profile-form"
            onSubmit={handleSubmit}
          >

		  <div className="profile-field">

		    <label>
		      👤 Full Name *
		    </label>

		    <input
		      type="text"
		      name="name"
		      value={formData.name}
		      onChange={handleChange}
		      placeholder="Enter your name"
		    />

		  </div>

		  <div className="profile-field">

		    <label>
		      ✉️ Email Address *
		    </label>

		    <input
		      type="email"
		      name="email"
		      value={formData.email}
		      onChange={handleChange}
		      placeholder="Enter your email"
		    />

		    <small className="profile-field-warning">
		      Changing your email will require you to log in again.
		    </small>

		  </div> 

		  <div className="profile-field">

		    <label>
		      🖼️ Profile Image URL
		    </label>

		    <input
		      type="text"
		      name="profileImage"
		      value={formData.profileImage}
		      onChange={handleChange}
		      placeholder="Enter an optional image URL"
		    />

		    <small className="profile-field-help">
		      Leave this empty to use your initial as the profile picture.
		    </small>

		  </div>

		  <button
		    type="submit"
		    className="profile-submit-button"
		  >
		    ✓ Save Profile Changes
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

        </div>

      </div>

    </div>
	</PetCareLayout>
  );
}

export default Profile;