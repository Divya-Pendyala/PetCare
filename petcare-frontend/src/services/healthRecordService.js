import api from "../api/axiosConfig";

export const getHealthRecords = (petId) => {
  return api.get(`/pets/${petId}/health-records`);
};

export const getHealthRecord = (petId, recordId) => {
  return api.get(
    `/pets/${petId}/health-records/${recordId}`
  );
};

export const addHealthRecord = (petId, recordData) => {
  return api.post(
    `/pets/${petId}/health-records`,
    recordData
  );
};

export const updateHealthRecord = (
  petId,
  recordId,
  recordData
) => {
  return api.put(
    `/pets/${petId}/health-records/${recordId}`,
    recordData
  );
};

export const deleteHealthRecord = (
  petId,
  recordId
) => {
  return api.delete(
    `/pets/${petId}/health-records/${recordId}`
  );
};