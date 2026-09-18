import api from "../api/axiosConfig";

export const getVaccinations = (petId) => {
  return api.get(`/pets/${petId}/vaccinations`);
};

export const getVaccination = (petId, vaccinationId) => {
  return api.get(
    `/pets/${petId}/vaccinations/${vaccinationId}`
  );
};

export const addVaccination = (petId, vaccinationData) => {
  return api.post(
    `/pets/${petId}/vaccinations`,
    vaccinationData
  );
};

export const updateVaccination = (
  petId,
  vaccinationId,
  vaccinationData
) => {
  return api.put(
    `/pets/${petId}/vaccinations/${vaccinationId}`,
    vaccinationData
  );
};

export const deleteVaccination = (
  petId,
  vaccinationId
) => {
  return api.delete(
    `/pets/${petId}/vaccinations/${vaccinationId}`
  );
};