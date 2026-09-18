import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PetCareLayout from "../components/PetCareLayout";
import { getPet } from "../services/petService";

import {
  getAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
} from "../services/appointmentService";

function Appointments() {
  const { petId } = useParams();

  const [pet, setPet] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const emptyForm = {
    appointmentDate: "",
    appointmentTime: "",
    veterinarian: "",
    clinicName: "",
    reason: "",
    status: "SCHEDULED",
    notes: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  const loadData = async () => {
    try {
      const petResponse = await getPet(petId);
      const appointmentResponse =
        await getAppointments(petId);

      setPet(petResponse.data);
      setAppointments(appointmentResponse.data);
      setError("");
    } catch (err) {
      setError("Unable to load appointment information.");
    }
  };

  useEffect(() => {
    loadData();
  }, [petId]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    const appointmentData = {
      ...formData,

      appointmentDate:
        formData.appointmentDate === ""
          ? null
          : formData.appointmentDate,

      appointmentTime:
        formData.appointmentTime === ""
          ? null
          : formData.appointmentTime,
    };

    try {
      if (editingId) {
        await updateAppointment(
          petId,
          editingId,
          appointmentData
        );

        setMessage("Appointment updated successfully.");
      } else {
        await addAppointment(
          petId,
          appointmentData
        );

        setMessage("Appointment added successfully.");
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
            Object.values(err.response.data).join(", ")
          );
        }
      } else {
        setError("Unable to save appointment.");
      }
    }
  };

  const handleEdit = (appointment) => {
    setEditingId(appointment.id);

    setFormData({
      appointmentDate:
        appointment.appointmentDate || "",
      appointmentTime:
        appointment.appointmentTime || "",
      veterinarian:
        appointment.veterinarian || "",
      clinicName:
        appointment.clinicName || "",
      reason:
        appointment.reason || "",
      status:
        appointment.status || "SCHEDULED",
      notes:
        appointment.notes || "",
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

  const handleDelete = async (
    appointmentId
  ) => {
    const confirmed = window.confirm(
      "Delete this appointment?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteAppointment(
        petId,
        appointmentId
      );

      setMessage("Appointment deleted successfully.");
      setError("");

      await loadData();
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Unable to delete appointment."
      );
    }
  };

  return (
	<PetCareLayout>

	    <div className="modern-page">

		<div className="modern-page-header">

		  <div>

		    <span className="page-eyebrow">
		      APPOINTMENT MANAGEMENT
		    </span>

		    <h1>
		      Veterinary Appointments 📅
		    </h1>

		    <p>
		      {pet
		        ? `Schedule and manage veterinary visits for ${pet.name}.`
		        : "Schedule and manage veterinary visits."}
		    </p>

		  </div>


		  <Link
		    to="/pets"
		    className="modern-back-button"
		  >
		    ← My Pets
		  </Link>

		</div>
		
		{pet && (

		  <div className="appointment-pet-banner">

		    <div className="appointment-pet-avatar">

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

		      <span className="pet-banner-label">
		        MANAGING APPOINTMENTS FOR
		      </span>

		      <h3>
		        {pet.name}
		      </h3>

		      <p>
		        {pet.breed || pet.species || "Pet"}
		      </p>

		    </div>

		    <div className="appointment-total">

		      <strong>
		        {appointments.length}
		      </strong>

		      <span>
		        Appointments
		      </span>

		    </div>

		  </div>

		)}

		<div className="record-form-card modern-appointment-form">

		  <div className="modern-card-heading">

		    <div className="modern-card-icon appointment-form-icon">
		      {editingId ? "✏️" : "📅"}
		    </div>

		    <div>

		      <h2>
		        {editingId
		          ? "Edit Appointment"
		          : "Schedule Appointment"}
		      </h2>

		      <p>
		        {editingId
		          ? "Update the veterinary appointment details."
		          : "Enter the veterinary appointment details below."}
		      </p>

		    </div>

		  </div>

        <form
          className="record-form"
          onSubmit={handleSubmit}
        >

          <div>
            <label>Appointment Date *</label>

            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Appointment Time *</label>

            <input
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Veterinarian</label>

            <input
              type="text"
              name="veterinarian"
              value={formData.veterinarian}
              onChange={handleChange}
              placeholder="Dr. Smith"
            />
          </div>

          <div>
            <label>Clinic Name</label>

            <input
              type="text"
              name="clinicName"
              value={formData.clinicName}
              onChange={handleChange}
              placeholder="Pet Health Clinic"
            />
          </div>

          <div>
            <label>Reason *</label>

            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Annual checkup"
            />
          </div>

          <div>
            <label>Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="SCHEDULED">
                SCHEDULED
              </option>

              <option value="COMPLETED">
                COMPLETED
              </option>

              <option value="CANCELLED">
                CANCELLED
              </option>
            </select>
          </div>

          <div className="full-width">
            <label>Notes</label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              placeholder="Additional appointment notes"
            />
          </div>

          <div className="form-buttons full-width">

		  <button
		    type="submit"
		    className="appointment-submit-button"
		  >
		    {editingId
		      ? "✓ Update Appointment"
		      : "📅 Schedule Appointment"}
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
	        VETERINARY VISITS
	      </span>

	      <h2>
	        Appointment Records
	      </h2>

	    </div>

	    <span className="appointment-count-badge">

	      {appointments.length}{" "}

	      {appointments.length === 1
	        ? "appointment"
	        : "appointments"}

	    </span>

	  </div>

      {appointments.length === 0 ? (

        <div className="empty-message">
          No appointments have been added.
        </div>

      ) : (

        <div className="records-grid">

          {appointments.map((appointment) => (

			<div
			  className="record-card modern-appointment-card"
			  key={appointment.id}
			>

			  <div className="appointment-card-top">

			    <div className="large-appointment-date">

			      <strong>

			        {appointment.appointmentDate
			          ? new Date(
			              appointment.appointmentDate +
			              "T00:00:00"
			            ).getDate()
			          : "--"}

			      </strong>

			      <span>

			        {appointment.appointmentDate
			          ? new Date(
			              appointment.appointmentDate +
			              "T00:00:00"
			            )
			              .toLocaleString(
			                "default",
			                { month: "short" }
			              )
			              .toUpperCase()
			          : "DATE"}

			      </span>

			    </div>


			    <div className="appointment-title-area">

			      <h3>
			        {appointment.reason}
			      </h3>

			      <span
			        className={
			          `appointment-status ${
			            appointment.status?.toLowerCase()
			          }`
			        }
			      >
			        {appointment.status}
			      </span>

			    </div>

			  </div>

			  <div className="appointment-detail">

			    <span>🕐</span>

			    <div>

			      <small>TIME</small>

			      <strong>
			        {appointment.appointmentTime ||
			          "Not provided"}
			      </strong>

			    </div>

			  </div>

			  <div className="appointment-detail">

			    <span>👨‍⚕️</span>

			    <div>

			      <small>VETERINARIAN</small>

			      <strong>
			        {appointment.veterinarian ||
			          "Not provided"}
			      </strong>

			    </div>

			  </div>

			  <div className="appointment-detail">

			    <span>🏥</span>

			    <div>

			      <small>CLINIC</small>

			      <strong>
			        {appointment.clinicName ||
			          "Not provided"}
			      </strong>

			    </div>

			  </div>

              {appointment.notes && (
                <p>
                  <strong>Notes:</strong>{" "}
                  {appointment.notes}
                </p>
              )}

              <div className="record-actions">

                <button
                  onClick={() =>
                    handleEdit(appointment)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-button"
                  onClick={() =>
                    handleDelete(
                      appointment.id
                    )
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

export default Appointments;