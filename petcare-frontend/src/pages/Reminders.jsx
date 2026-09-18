import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PetCareLayout from "../components/PetCareLayout";
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
	<PetCareLayout>

	    <div className="modern-page">

		<div className="modern-page-header">

		  <div>

		    <span className="page-eyebrow">
		      PET CARE SCHEDULE
		    </span>

		    <h1>
		     Pet Care Reminders 🔔
		    </h1>

		    <p>
		      {pet
		        ? `Manage important care reminders for ${pet.name}.`
		        : "Manage important pet care reminders."}
		    </p>

		  </div>

		  <Link
		    to="/pets"
		    className="modern-back-button reminder-back-button"
		  >
		    ← My Pets
		  </Link>

		</div>
		
		{pet && (

		  <div className="reminder-pet-banner">

		    <div className="reminder-pet-avatar">

		      {pet.imageUrl ? (

		        <img
		          src={pet.imageUrl}
		          alt={pet.name}
		        />

		      ) : (

		        <span>🐾</span>

		      )}

		    </div>

		    <div>

		      <span className="reminder-banner-label">
		        CARE REMINDERS FOR
		      </span>

		      <h3>
		        {pet.name}
		      </h3>

		      <p>
		        {pet.breed || pet.species || "Pet"}
		      </p>

		    </div>

		    <div className="reminder-total">

		      <strong>
		        {reminders.length}
		      </strong>

		      <span>
		        Reminders
		      </span>

		    </div>

		  </div>

		)}
		
		<div className="reminder-summary-row">

		  <div className="reminder-mini-summary active-reminder-summary">

		    <span>🔔</span>

		    <div>
		      <strong>
		        {
		          reminders.filter(
		            reminder => !reminder.completed
		          ).length
		        }
		      </strong>

		      <small>
		        Active
		      </small>
		    </div>

		  </div>


		  <div className="reminder-mini-summary completed-reminder-summary">

		    <span>✓</span>

		    <div>
		      <strong>
		        {
		          reminders.filter(
		            reminder => reminder.completed
		          ).length
		        }
		      </strong>

		      <small>
		        Completed
		      </small>
		    </div>

		  </div>

		</div>

		<div className="record-form-card modern-reminder-form">

		  <div className="modern-card-heading">

		    <div className="modern-card-icon reminder-form-icon">
		      {editingId ? "✏️" : "🔔"}
		    </div>

		    <div>

		      <h2>
		        {editingId
		          ? "Edit Reminder"
		          : "Add Care Reminder"}
		      </h2>

		      <p>
		        {editingId
		          ? "Update this care reminder."
		          : "Create a reminder for your pet's care schedule."}
		      </p>

		    </div>

		  </div>

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

		  <button
		    type="submit"
		    className="reminder-submit-button"
		  >
		    {editingId
		      ? "✓ Update Reminder"
		      : "🔔 Add Reminder"}
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

	  <div className="records-section-heading">

	    <div>

	      <span className="page-eyebrow">
	        CARE SCHEDULE
	      </span>

	      <h2>
	        Your Reminders
	      </h2>

	    </div>

	    <span className="reminder-count-badge">

	      {reminders.length}{" "}

	      {reminders.length === 1
	        ? "reminder"
	        : "reminders"}

	    </span>

	  </div>

      {reminders.length === 0 ? (

        <div className="empty-message">
          No reminders have been added.
        </div>

      ) : (

        <div className="records-grid">

		{reminders.map((reminder) => (

		  <div
		    className={
		      `record-card modern-reminder-card ${
		        reminder.completed
		          ? "reminder-card-completed"
		          : ""
		      }`
		    }
		    key={reminder.id}
		  >

		    <div className="reminder-card-top">

		      <div
		        className={
		          `reminder-icon-large ${
		            reminder.completed
		              ? "completed-icon"
		              : ""
		          }`
		        }
		      >
		        {reminder.completed ? "✓" : "🔔"}
		      </div>


		      <div className="reminder-title-area">

		        <span className="reminder-small-label">
		          {reminder.reminderType || "PET CARE"}
		        </span>

		        <h3>
		          {reminder.title}
		        </h3>

		      </div>


		      <span
		        className={
		          reminder.completed
		            ? "reminder-status completed"
		            : "reminder-status active"
		        }
		      >
		        {reminder.completed
		          ? "COMPLETED"
		          : "ACTIVE"}
		      </span>

		    </div>

			<div className="reminder-detail">

			  <span>📅</span>

			  <div>

			    <small>REMINDER DATE</small>

			    <strong>
			      {reminder.reminderDate || "No date"}
			    </strong>

			  </div>

			</div>

			<div className="reminder-detail">

			  <span>🕐</span>

			  <div>

			    <small>REMINDER TIME</small>

			    <strong>
			      {reminder.reminderTime || "No time"}
			    </strong>

			  </div>

			</div>
			
			<div className="reminder-detail">

			  <span>🏷️</span>

			  <div>

			    <small>REMINDER TYPE</small>

			    <strong>
			      {reminder.reminderType || "General"}
			    </strong>

			  </div>

			</div>

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
	</PetCareLayout>
  );
}

export default Reminders;