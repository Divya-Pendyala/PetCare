import api from "../api/axiosConfig";

export const getAppointments = (petId) => {
  return api.get(`/pets/${petId}/appointments`);
};

export const getAppointment = (petId, appointmentId) => {
  return api.get(
    `/pets/${petId}/appointments/${appointmentId}`
  );
};

export const addAppointment = (petId, appointmentData) => {
  return api.post(
    `/pets/${petId}/appointments`,
    appointmentData
  );
};

export const updateAppointment = (
  petId,
  appointmentId,
  appointmentData
) => {
  return api.put(
    `/pets/${petId}/appointments/${appointmentId}`,
    appointmentData
  );
};

export const deleteAppointment = (
  petId,
  appointmentId
) => {
  return api.delete(
    `/pets/${petId}/appointments/${appointmentId}`
  );
};