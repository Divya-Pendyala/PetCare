import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getPet } from "../services/petService";

import {
  getReminders,
  addReminder,
  updateReminder,
  deleteReminder,
} from "../services/reminderService";

function Reminders() {
  const { petId } = useParams();

  const [pet, setPet] = useState(null);
  const [reminders, setReminders] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const emptyForm = {
    title: "",
    reminderType: "",
    reminderDate: "",
    reminderTime: "",
    completed: false,
    notes: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  const loadData = async () => {
    try {
      const petResponse = await getPet(petId);
      const reminderResponse = await getReminders(petId);

      setPet(petResponse.data);
      setReminders(reminderResponse.data);

      setError("");
    } catch (err) {
      setError("Unable to load reminder information.");
    }
  };

  useEffect(() => {
    loadData();
  }, [petId]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    const reminderData = {
      ...formData,

      reminderDate:
        formData.reminderDate === ""
          ? null
          : formData.reminderDate,

      reminderTime:
        formData.reminderTime === ""
          ? null
          : formData.reminderTime,
    };

    try {
      if (editingId) {
        await updateReminder(
          petId,
          editingId,
          reminderData
        );

        setMessage(
          "Reminder updated successfully."
        );
      } else {
        await addReminder(
          petId,
          reminderData
        );

        setMessage(
          "Reminder added successfully."
        );
      }

      setEditingId(null);
      setFormData(emptyForm);

      await loadData();

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
        setError("Unable to save reminder.");
      }
    }
  };

  const handleEdit = (reminder) => {
    setEditingId(reminder.id);

    setFormData({
      title: reminder.title || "",
      reminderType: reminder.reminderType || "",
      reminderDate: reminder.reminderDate || "",
      reminderTime: reminder.reminderTime || "",
      completed: reminder.completed ?? false,
      notes: reminder.notes || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleDelete = async (reminderId) => {
    const confirmed = window.confirm(
      "Delete this reminder?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteReminder(
        petId,
        reminderId
      );

      setMessage(
        "Reminder deleted successfully."
      );

      setError("");

      await loadData();

    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Unable to delete reminder."
      );
    }
  };

  return (
    <div className="page-container">

      <div className="page-header">

        <div>
          <h1>Pet Care Reminders</h1>

          <p>
            {pet
              ? `Manage reminders for ${pet.name}.`
              : "Manage pet care reminders."}
          </p>
        </div>

        <Link
          to="/pets"
          className="back-link"
        >
          Back to My Pets
        </Link>

      </div>

      <div className="record-form-card">

        <h2>
          {editingId
            ? "Edit Reminder"
            : "Add Reminder"}
        </h2>

        <form
          className="record-form"
          onSubmit={handleSubmit}
        >

          <div>
            <label>Title *</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Give flea medication"
            />
          </div>

          <div>
            <label>Reminder Type *</label>

            <select
              name="reminderType"
              value={formData.reminderType}
              onChange={handleChange}
            >
              <option value="">
                Select reminder type
              </option>

              <option value="MEDICATION">
                Medication
              </option>

              <option value="VACCINATION">
                Vaccination
              </option>

              <option value="APPOINTMENT">
                Appointment
              </option>

              <option value="GROOMING">
                Grooming
              </option>

              <option value="FEEDING">
                Feeding
              </option>

              <option value="EXERCISE">
                Exercise
              </option>

              <option value="OTHER">
                Other
              </option>
            </select>
          </div>

          <div>
            <label>Reminder Date *</label>

            <input
              type="date"
              name="reminderDate"
              value={formData.reminderDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Reminder Time</label>

            <input
              type="time"
              name="reminderTime"
              value={formData.reminderTime}
              onChange={handleChange}
            />
          </div>

          <div className="full-width checkbox-field">

            <label>
              <input
                type="checkbox"
                name="completed"
                checked={formData.completed}
                onChange={handleChange}
              />

              Completed
            </label>

          </div>

          <div className="full-width">

            <label>Notes</label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              placeholder="Additional reminder information"
            />

          </div>

          <div className="form-buttons full-width">

            <button type="submit">
              {editingId
                ? "Update Reminder"
                : "Add Reminder"}
            </button>

            {editingId && (
              <button
                type="button"
                className="secondary-button"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}

          </div>

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

      <h2 className="section-title">
        Reminder List
      </h2>

      {reminders.length === 0 ? (

        <div className="empty-message">
          No reminders have been added.
        </div>

      ) : (

        <div className="records-grid">

          {reminders.map((reminder) => (

            <div
              className="record-card"
              key={reminder.id}
            >

              <h3>{reminder.title}</h3>

              <p>
                <strong>Type:</strong>{" "}
                {reminder.reminderType}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {reminder.reminderDate}
              </p>

              <p>
                <strong>Time:</strong>{" "}
                {reminder.reminderTime ||
                  "Not provided"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {reminder.completed
                  ? "Completed"
                  : "Pending"}
              </p>

              {reminder.notes && (
                <p>
                  <strong>Notes:</strong>{" "}
                  {reminder.notes}
                </p>
              )}

              <div className="record-actions">

                <button
                  onClick={() =>
                    handleEdit(reminder)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-button"
                  onClick={() =>
                    handleDelete(reminder.id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Reminders;