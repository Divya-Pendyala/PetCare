import api from "../api/axiosConfig";

export const getProfile = () => {
  return api.get("/profile");
};

export const updateProfile = (profileData) => {
  return api.put("/profile", profileData);
};