import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
      <div className="page-container">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="page-container">

      <div className="page-header">

        <div>
          <h1>My Profile</h1>

          <p>
            View and update your PetCare account.
          </p>
        </div>

        <Link
          to="/dashboard"
          className="back-link"
        >
          Back to Dashboard
        </Link>

      </div>

      <div className="profile-layout">

        <div className="profile-preview">

          {formData.profileImage ? (

            <img
              src={formData.profileImage}
              alt={formData.name}
              className="profile-image"
            />

          ) : (

            <div className="profile-placeholder">
              {formData.name
                ? formData.name
                    .charAt(0)
                    .toUpperCase()
                : "U"}
            </div>

          )}

          <h2>
            {formData.name || "PetCare User"}
          </h2>

          <p>{formData.email}</p>

        </div>

        <div className="profile-form-card">

          <h2>Edit Profile</h2>

          <form
            className="profile-form"
            onSubmit={handleSubmit}
          >

            <label>Name *</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />

            <label>Email *</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
            />

            <label>Profile Image URL</label>

            <input
              type="text"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              placeholder="Optional image URL"
            />

            <button type="submit">
              Update Profile
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
  );
}

export default Profile;