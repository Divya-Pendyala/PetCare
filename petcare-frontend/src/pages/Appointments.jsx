import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
    <div className="page-container">

      <div className="page-header">

        <div>
          <h1>Veterinary Appointments</h1>

          <p>
            {pet
              ? `Manage veterinary appointments for ${pet.name}.`
              : "Manage veterinary appointments."}
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
            ? "Edit Appointment"
            : "Add Appointment"}
        </h2>

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

            <button type="submit">
              {editingId
                ? "Update Appointment"
                : "Add Appointment"}
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
        Appointment Records
      </h2>

      {appointments.length === 0 ? (

        <div className="empty-message">
          No appointments have been added.
        </div>

      ) : (

        <div className="records-grid">

          {appointments.map((appointment) => (

            <div
              className="record-card"
              key={appointment.id}
            >

              <h3>
                {appointment.reason}
              </h3>

              <p>
                <strong>Date:</strong>{" "}
                {appointment.appointmentDate}
              </p>

              <p>
                <strong>Time:</strong>{" "}
                {appointment.appointmentTime}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {appointment.status}
              </p>

              <p>
                <strong>Veterinarian:</strong>{" "}
                {appointment.veterinarian ||
                  "Not provided"}
              </p>

              <p>
                <strong>Clinic:</strong>{" "}
                {appointment.clinicName ||
                  "Not provided"}
              </p>

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
  );
}

export default Appointments;