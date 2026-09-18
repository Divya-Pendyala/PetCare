import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getPet } from "../services/petService";

import {
  getVaccinations,
  addVaccination,
  updateVaccination,
  deleteVaccination,
} from "../services/vaccinationService";

function Vaccinations() {
  const { petId } = useParams();

  const [pet, setPet] = useState(null);
  const [vaccinations, setVaccinations] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const emptyForm = {
    vaccineName: "",
    dateGiven: "",
    nextDueDate: "",
    veterinarian: "",
    clinicName: "",
    notes: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  const loadData = async () => {
    try {
      const petResponse = await getPet(petId);
      const vaccinationResponse =
        await getVaccinations(petId);

      setPet(petResponse.data);
      setVaccinations(vaccinationResponse.data);
      setError("");
    } catch (err) {
      setError("Unable to load vaccination information.");
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

    const vaccinationData = {
      ...formData,

      dateGiven:
        formData.dateGiven === ""
          ? null
          : formData.dateGiven,

      nextDueDate:
        formData.nextDueDate === ""
          ? null
          : formData.nextDueDate,
    };

    try {
      if (editingId) {
        await updateVaccination(
          petId,
          editingId,
          vaccinationData
        );

        setMessage(
          "Vaccination updated successfully."
        );
      } else {
        await addVaccination(
          petId,
          vaccinationData
        );

        setMessage(
          "Vaccination added successfully."
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
            Object.values(err.response.data).join(", ")
          );
        }
      } else {
        setError("Unable to save vaccination.");
      }
    }
  };

  const handleEdit = (vaccination) => {
    setEditingId(vaccination.id);

    setFormData({
      vaccineName: vaccination.vaccineName || "",
      dateGiven: vaccination.dateGiven || "",
      nextDueDate: vaccination.nextDueDate || "",
      veterinarian: vaccination.veterinarian || "",
      clinicName: vaccination.clinicName || "",
      notes: vaccination.notes || "",
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
    vaccinationId,
    vaccineName
  ) => {
    const confirmed = window.confirm(
      `Delete ${vaccineName} vaccination record?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteVaccination(
        petId,
        vaccinationId
      );

      setMessage(
        "Vaccination deleted successfully."
      );

      setError("");

      await loadData();
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Unable to delete vaccination."
      );
    }
  };

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>Vaccinations</h1>

          <p>
            {pet
              ? `Manage vaccination records for ${pet.name}.`
              : "Manage vaccination records."}
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
            ? "Edit Vaccination"
            : "Add Vaccination"}
        </h2>

        <form
          className="record-form"
          onSubmit={handleSubmit}
        >

          <div>
            <label>Vaccine Name *</label>

            <input
              type="text"
              name="vaccineName"
              value={formData.vaccineName}
              onChange={handleChange}
              placeholder="Rabies"
            />
          </div>

          <div>
            <label>Date Given *</label>

            <input
              type="date"
              name="dateGiven"
              value={formData.dateGiven}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Next Due Date</label>

            <input
              type="date"
              name="nextDueDate"
              value={formData.nextDueDate}
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

          <div className="full-width">
            <label>Notes</label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              placeholder="Additional information"
            />
          </div>

          <div className="form-buttons full-width">

            <button type="submit">
              {editingId
                ? "Update Vaccination"
                : "Add Vaccination"}
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
        Vaccination Records
      </h2>

      {vaccinations.length === 0 ? (

        <div className="empty-message">
          No vaccination records have been added.
        </div>

      ) : (

        <div className="records-grid">

          {vaccinations.map((vaccination) => (

            <div
              className="record-card"
              key={vaccination.id}
            >

              <h3>
                {vaccination.vaccineName}
              </h3>

              <p>
                <strong>Date Given:</strong>{" "}
                {vaccination.dateGiven}
              </p>

              <p>
                <strong>Next Due:</strong>{" "}
                {vaccination.nextDueDate ||
                  "Not provided"}
              </p>

              <p>
                <strong>Veterinarian:</strong>{" "}
                {vaccination.veterinarian ||
                  "Not provided"}
              </p>

              <p>
                <strong>Clinic:</strong>{" "}
                {vaccination.clinicName ||
                  "Not provided"}
              </p>

              {vaccination.notes && (
                <p>
                  <strong>Notes:</strong>{" "}
                  {vaccination.notes}
                </p>
              )}

              <div className="record-actions">

                <button
                  onClick={() =>
                    handleEdit(vaccination)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-button"
                  onClick={() =>
                    handleDelete(
                      vaccination.id,
                      vaccination.vaccineName
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

export default Vaccinations;