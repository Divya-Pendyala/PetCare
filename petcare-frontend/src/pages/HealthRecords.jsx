import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getPet } from "../services/petService";

import {
  getHealthRecords,
  addHealthRecord,
  updateHealthRecord,
  deleteHealthRecord,
} from "../services/healthRecordService";

function HealthRecords() {
  const { petId } = useParams();

  const [pet, setPet] = useState(null);
  const [healthRecords, setHealthRecords] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const emptyForm = {
    recordDate: "",
    diagnosis: "",
    symptoms: "",
    treatment: "",
    medication: "",
    veterinarian: "",
    notes: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  const loadData = async () => {
    try {
      const petResponse = await getPet(petId);

      const recordResponse =
        await getHealthRecords(petId);

      setPet(petResponse.data);
      setHealthRecords(recordResponse.data);

      setError("");
    } catch (err) {
      setError(
        "Unable to load health record information."
      );
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

    const recordData = {
      ...formData,

      recordDate:
        formData.recordDate === ""
          ? null
          : formData.recordDate,
    };

    try {
      if (editingId) {
        await updateHealthRecord(
          petId,
          editingId,
          recordData
        );

        setMessage(
          "Health record updated successfully."
        );
      } else {
        await addHealthRecord(
          petId,
          recordData
        );

        setMessage(
          "Health record added successfully."
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
        setError(
          "Unable to save health record."
        );
      }
    }
  };

  const handleEdit = (record) => {
    setEditingId(record.id);

    setFormData({
      recordDate:
        record.recordDate || "",

      diagnosis:
        record.diagnosis || "",

      symptoms:
        record.symptoms || "",

      treatment:
        record.treatment || "",

      medication:
        record.medication || "",

      veterinarian:
        record.veterinarian || "",

      notes:
        record.notes || "",
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
    recordId
  ) => {
    const confirmed = window.confirm(
      "Delete this health record?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteHealthRecord(
        petId,
        recordId
      );

      setMessage(
        "Health record deleted successfully."
      );

      setError("");

      await loadData();

    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Unable to delete health record."
      );
    }
  };

  return (
    <div className="page-container">

      <div className="page-header">

        <div>
          <h1>Health Records</h1>

          <p>
            {pet
              ? `Manage health records for ${pet.name}.`
              : "Manage pet health records."}
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
            ? "Edit Health Record"
            : "Add Health Record"}
        </h2>

        <form
          className="record-form"
          onSubmit={handleSubmit}
        >

          <div>
            <label>Record Date *</label>

            <input
              type="date"
              name="recordDate"
              value={formData.recordDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Diagnosis *</label>

            <input
              type="text"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              placeholder="Diagnosis"
            />
          </div>

          <div>
            <label>Symptoms</label>

            <input
              type="text"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              placeholder="Symptoms"
            />
          </div>

          <div>
            <label>Treatment</label>

            <input
              type="text"
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              placeholder="Treatment"
            />
          </div>

          <div>
            <label>Medication</label>

            <input
              type="text"
              name="medication"
              value={formData.medication}
              onChange={handleChange}
              placeholder="Medication"
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

          <div className="full-width">

            <label>Notes</label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              placeholder="Additional health information"
            />

          </div>

          <div className="form-buttons full-width">

            <button type="submit">
              {editingId
                ? "Update Health Record"
                : "Add Health Record"}
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
        Health Record History
      </h2>

      {healthRecords.length === 0 ? (

        <div className="empty-message">
          No health records have been added.
        </div>

      ) : (

        <div className="records-grid">

          {healthRecords.map((record) => (

            <div
              className="record-card"
              key={record.id}
            >

              <h3>
                {record.diagnosis}
              </h3>

              <p>
                <strong>Date:</strong>{" "}
                {record.recordDate}
              </p>

              <p>
                <strong>Symptoms:</strong>{" "}
                {record.symptoms ||
                  "Not provided"}
              </p>

              <p>
                <strong>Treatment:</strong>{" "}
                {record.treatment ||
                  "Not provided"}
              </p>

              <p>
                <strong>Medication:</strong>{" "}
                {record.medication ||
                  "Not provided"}
              </p>

              <p>
                <strong>Veterinarian:</strong>{" "}
                {record.veterinarian ||
                  "Not provided"}
              </p>

              {record.notes && (
                <p>
                  <strong>Notes:</strong>{" "}
                  {record.notes}
                </p>
              )}

              <div className="record-actions">

                <button
                  onClick={() =>
                    handleEdit(record)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-button"
                  onClick={() =>
                    handleDelete(record.id)
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

export default HealthRecords;