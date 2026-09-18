import api from "../api/axiosConfig";

export const getReminders = (petId) => {
  return api.get(`/pets/${petId}/reminders`);
};

export const getReminder = (petId, reminderId) => {
  return api.get(
    `/pets/${petId}/reminders/${reminderId}`
  );
};

export const addReminder = (petId, reminderData) => {
  return api.post(
    `/pets/${petId}/reminders`,
    reminderData
  );
};

export const updateReminder = (
  petId,
  reminderId,
  reminderData
) => {
  return api.put(
    `/pets/${petId}/reminders/${reminderId}`,
    reminderData
  );
};

export const deleteReminder = (
  petId,
  reminderId
) => {
  return api.delete(
    `/pets/${petId}/reminders/${reminderId}`
  );
};