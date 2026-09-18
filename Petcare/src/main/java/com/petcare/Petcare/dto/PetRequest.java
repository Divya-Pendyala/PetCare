package com.petcare.Petcare.dto;
import java.time.LocalDate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public class PetRequest 
{
	@NotBlank(message = "Pet name is required")
    private String name;

    @NotBlank(message = "Species is required")
    private String species;

    private String breed;

    private LocalDate dateOfBirth;

    private String gender;

    @Positive(message = "Weight must be greater than zero")
    private Double weight;

    private String color;

    private String notes;

    private String imageUrl;

    public PetRequest() {    }

    public String getName() 
    {
        return name;
    }

    public void setName(String name) 
    {
        this.name = name;
    }

    public String getSpecies() 
    {
        return species;
    }

    public void setSpecies(String species) 
    {
        this.species = species;
    }

    public String getBreed() 
    {
        return breed;
    }

    public void setBreed(String breed) 
    {
        this.breed = breed;
    }

    public LocalDate getDateOfBirth() 
    {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) 
    {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() 
    {
        return gender;
    }

    public void setGender(String gender) 
    {
        this.gender = gender;
    }

    public Double getWeight() 
    {
        return weight;
    }

    public void setWeight(Double weight) 
    {
        this.weight = weight;
    }

    public String getColor() 
    {
        return color;
    }

    public void setColor(String color) 
    {
        this.color = color;
    }

    public String getNotes() 
    {
        return notes;
    }

    public void setNotes(String notes) 
    {
        this.notes = notes;
    }

    public String getImageUrl() 
    {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) 
    {
        this.imageUrl = imageUrl;
    }
}
