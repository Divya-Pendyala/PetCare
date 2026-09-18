import api from "../api/axiosConfig";

export const getPets = () => {
  return api.get("/pets");
};

export const getPet = (petId) => {
  return api.get(`/pets/${petId}`);
};

export const addPet = (petData) => {
  return api.post("/pets", petData);
};

export const updatePet = (petId, petData) => {
  return api.put(`/pets/${petId}`, petData);
};

export const deletePet = (petId) => {
  return api.delete(`/pets/${petId}`);
};