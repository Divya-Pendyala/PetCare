import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PetCareLayout from "../components/PetCareLayout";

import {
  getPets,
  addPet,
  updatePet,
  deletePet,
} from "../services/petService";

function Pets() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    name: "",
    species: "",
    breed: "",
    dateOfBirth: "",
    gender: "",
    weight: "",
    color: "",
    notes: "",
    imageUrl: "",
  };

  const [formData, setFormData] =
    useState(emptyForm);

  const loadPets = async () => {
    try {
      const response = await getPets();
      setPets(response.data);
      setError("");
    } catch (err) {
      setError("Unable to load pets.");
    }
  };

  useEffect(() => {
    loadPets();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]:
        event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    const petData = {
      ...formData,

      weight:
        formData.weight === ""
          ? null
          : Number(formData.weight),

      dateOfBirth:
        formData.dateOfBirth === ""
          ? null
          : formData.dateOfBirth,
    };

    try {
      if (editingId) {
        await updatePet(
          editingId,
          petData
        );

        setMessage(
          "Pet updated successfully."
        );
      } else {
        await addPet(petData);

        setMessage(
          "Pet added successfully."
        );
      }

      setFormData(emptyForm);
      setEditingId(null);

      await loadPets();

    } catch (err) {
      if (err.response?.data) {
        if (err.response.data.error) {
          setError(
            err.response.data.error
          );
        } else {
          setError(
            Object.values(
              err.response.data
            ).join(", ")
          );
        }
      } else {
        setError(
          "Unable to save pet."
        );
      }
    }
  };

  const handleEdit = (pet) => {
    setEditingId(pet.id);

    setFormData({
      name: pet.name || "",
      species: pet.species || "",
      breed: pet.breed || "",
      dateOfBirth:
        pet.dateOfBirth || "",
      gender: pet.gender || "",
      weight:
        pet.weight ?? "",
      color: pet.color || "",
      notes: pet.notes || "",
      imageUrl: pet.imageUrl || "",
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
    petId,
    petName
  ) => {
    const confirmed =
      window.confirm(
        `Delete ${petName}?`
      );

    if (!confirmed) {
      return;
    }

    try {
      await deletePet(petId);

      setMessage(
        "Pet deleted successfully."
      );

      setError("");

      await loadPets();

    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Unable to delete pet."
      );
    }
  };

  return (

    <PetCareLayout>

      <div className="modern-page">

	  <div className="modern-page-header">

	    <div>

	      <span className="page-eyebrow">
	        PET MANAGEMENT
	      </span>

	      <h1>
	        My Pets 🐾
	      </h1>

	      <p>
	        Add, manage and keep track of all your pets.
	      </p>

	    </div>


	    <div className="pet-count-badge">

	      <span>🐶</span>

	      <div>

	        <strong>
	          {pets.length}
	        </strong>

	        <small>
	          Total Pets
	        </small>

	      </div>

	    </div>

	  </div>

	  <div className="modern-form-card">

	    <div className="modern-card-heading">

	      <div className="modern-card-icon">
	        {editingId ? "✏️" : "🐾"}
	      </div>

	      <div>

	        <h2>
	          {editingId
	            ? "Edit Pet"
	            : "Add New Pet"}
	        </h2>

	        <p>
	          {editingId
	            ? "Update your pet's information."
	            : "Enter your pet's information below."}
	        </p>

	      </div>

	    </div>

        <form
          className="pet-form"
          onSubmit={handleSubmit}
        >

          <div>
            <label>Pet Name *</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Pet name"
            />
          </div>

          <div>
            <label>Species *</label>

            <input
              type="text"
              name="species"
              value={formData.species}
              onChange={handleChange}
              placeholder="Dog, Cat..."
            />
          </div>

          <div>
            <label>Breed</label>

            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              placeholder="Breed"
            />
          </div>

          <div>
            <label>Date of Birth</label>

            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Gender</label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">
                Select
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>

          <div>
            <label>Weight</label>

            <input
              type="number"
              step="0.1"
              min="0.1"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Weight"
            />
          </div>

          <div>
            <label>Color</label>

            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Color"
            />
          </div>

          <div>
            <label>Image URL</label>

            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Optional image URL"
            />
          </div>

          <div className="full-width">
            <label>Notes</label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Notes about your pet"
              rows="3"
            />
          </div>

          <div className="form-buttons full-width">

            <button type="submit">
              {editingId
                ? "Update Pet"
                : "Add Pet"}
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

	  <div className="pets-section-heading">

	    <div>

	      <span className="page-eyebrow">
	        YOUR PET FAMILY
	      </span>

	      <h2>
	        Your Pets
	      </h2>

	    </div>

	    <span className="pets-result-count">
	      {pets.length} {pets.length === 1 ? "pet" : "pets"}
	    </span>

	  </div>

      {pets.length === 0 ? (

        <div className="empty-message">
          You haven't added any pets yet.
        </div>

      ) : (

        <div className="pets-grid">

          {pets.map((pet) => (

            <div
              className="pet-card modern-pet-card"
              key={pet.id}
            >

			<div className="modern-pet-image">

			  {pet.imageUrl ? (

			    <img
			      src={pet.imageUrl}
			      alt={pet.name}
			    />

			  ) : (

			    <div className="modern-pet-placeholder">
			      🐾
			    </div>

			  )}

			</div>  

              <h2>{pet.name}</h2>

              <p>
                <strong>Species:</strong>{" "}
                {pet.species}
              </p>

              <p>
                <strong>Breed:</strong>{" "}
                {pet.breed || "Not provided"}
              </p>

              <p>
                <strong>Gender:</strong>{" "}
                {pet.gender || "Not provided"}
              </p>

              <p>
                <strong>Date of Birth:</strong>{" "}
                {pet.dateOfBirth || "Not provided"}
              </p>

              <p>
                <strong>Weight:</strong>{" "}
                {pet.weight
                  ? `${pet.weight}`
                  : "Not provided"}
              </p>

              <p>
                <strong>Color:</strong>{" "}
                {pet.color || "Not provided"}
              </p>

              {pet.notes && (
                <p>
                  <strong>Notes:</strong>{" "}
                  {pet.notes}
                </p>
              )}

			  <div className="pet-actions">

			    <Link
			      to={`/pets/${pet.id}/vaccinations`}
			      className="action-link"
			    >
			      Vaccinations
			    </Link>
				
				<Link
				  to={`/pets/${pet.id}/appointments`}
				  className="action-link"
				>
				  Appointments
				</Link>
				
				<Link
				  to={`/pets/${pet.id}/health-records`}
				  className="action-link"
				>
				  Health Records
				</Link>
				
				<Link
				  to={`/pets/${pet.id}/reminders`}
				  className="action-link"
				>
				  Reminders
				</Link>

			    <button
			      onClick={() =>
			        handleEdit(pet)
			      }
			    >
			      Edit
			    </button>

			    <button
			      className="delete-button"
			      onClick={() =>
			        handleDelete(
			          pet.id,
			          pet.name
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

export default Pets;