import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PetCareLayout from "../components/PetCareLayout";
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
	<PetCareLayout>

	    <div className="modern-page">

		<div className="modern-page-header">

		  <div>

		    <span className="page-eyebrow">
		      HEALTH MANAGEMENT
		    </span>

		    <h1>
		      Health Records ❤️
		    </h1>

		    <p>
		      {pet
		        ? `Track medical history and health information for ${pet.name}.`
		        : "Track your pet's medical history and health information."}
		    </p>

		  </div>

		  <Link
		    to="/pets"
		    className="modern-back-button health-back-button"
		  >
		    ← My Pets
		  </Link>

		</div>
		
		{pet && (

		  <div className="health-pet-banner">

		    <div className="health-pet-avatar">

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

		      <span className="health-banner-label">
		        HEALTH RECORDS FOR
		      </span>

		      <h3>
		        {pet.name}
		      </h3>

		      <p>
		        {pet.breed || pet.species || "Pet"}
		      </p>

		    </div>

		    <div className="health-total">

		      <strong>
		        {healthRecords.length}
		      </strong>

		      <span>
		        Health Records
		      </span>

		    </div>

		  </div>

		)}

		<div className="record-form-card modern-health-form">

		  <div className="modern-card-heading">

		    <div className="modern-card-icon health-form-icon">
		      {editingId ? "✏️" : "❤️"}
		    </div>

		    <div>

		      <h2>
		        {editingId
		          ? "Edit Health Record"
		          : "Add Health Record"}
		      </h2>

		      <p>
		        {editingId
		          ? "Update this medical record."
		          : "Record your pet's medical and health information."}
		      </p>

		    </div>

		  </div>

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

		  <button
		    type="submit"
		    className="health-submit-button"
		  >
		    {editingId
		      ? "✓ Update Health Record"
		      : "❤️ Add Health Record"}
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
	        MEDICAL HISTORY
	      </span>

	      <h2>
	        Health Records
	      </h2>

	    </div>

	    <span className="health-count-badge">

	      {healthRecords.length}{" "}

	      {healthRecords.length === 1
	        ? "record"
	        : "records"}

	    </span>

	  </div>

      {healthRecords.length === 0 ? (

        <div className="empty-message">
          No health records have been added.
        </div>

      ) : (

        <div className="records-grid">

          {healthRecords.map((record) => (

		  <div
		    className="record-card modern-health-card"
		    key={record.id}
		  >

		    <div className="health-card-top">

		      <div className="health-icon-large">
		        ❤️
		      </div>

		      <div className="health-title-area">

		        <span className="health-small-label">
		          DIAGNOSIS
		        </span>

		        <h3>
		          {record.diagnosis || "General Health Record"}
		        </h3>

		        <span className="health-record-date">
		          📅 {record.recordDate || "No date"}
		        </span>

		      </div>

		    </div>

			<div className="health-detail">

			  <span>🩺</span>

			  <div>

			    <small>SYMPTOMS</small>

			    <strong>
			      {record.symptoms || "None recorded"}
			    </strong>

			  </div>

			</div>

			<div className="health-detail">

			  <span>🏥</span>

			  <div>

			    <small>TREATMENT</small>

			    <strong>
			      {record.treatment || "No treatment recorded"}
			    </strong>

			  </div>

			</div>

			<div className="health-detail medication-detail">

			  <span>💊</span>

			  <div>

			    <small>MEDICATION</small>

			    <strong>
			      {record.medication || "No medication"}
			    </strong>

			  </div>

			</div>

			<div className="health-detail">

			  <span>👨‍⚕️</span>

			  <div>

			    <small>VETERINARIAN</small>

			    <strong>
			      {record.veterinarian || "Not provided"}
			    </strong>

			  </div>

			</div>

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
	</PetCareLayout>
  );
}

export default HealthRecords;