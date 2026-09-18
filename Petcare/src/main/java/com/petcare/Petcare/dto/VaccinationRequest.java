package com.petcare.Petcare.dto;
import java.time.LocalDate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class VaccinationRequest 
{
	@NotBlank(message = "Vaccine name is required")
    private String vaccineName;

    @NotNull(message = "Date given is required")
    private LocalDate dateGiven;

    private LocalDate nextDueDate;

    private String veterinarian;

    private String clinicName;

    private String notes;

    public VaccinationRequest() {   }

    public String getVaccineName() 
    {
        return vaccineName;
    }

    public void setVaccineName(String vaccineName) 
    {
        this.vaccineName = vaccineName;
    }

    public LocalDate getDateGiven() 
    {
        return dateGiven;
    }

    public void setDateGiven(LocalDate dateGiven) 
    {
        this.dateGiven = dateGiven;
    }

    public LocalDate getNextDueDate() 
    {
        return nextDueDate;
    }

    public void setNextDueDate(LocalDate nextDueDate) 
    {
        this.nextDueDate = nextDueDate;
    }

    public String getVeterinarian() 
    {
        return veterinarian;
    }

    public void setVeterinarian(String veterinarian) 
    {
        this.veterinarian = veterinarian;
    }

    public String getClinicName() 
    {
        return clinicName;
    }

    public void setClinicName(String clinicName) 
    {
        this.clinicName = clinicName;
    }

    public String getNotes() 
    {
        return notes;
    }

    public void setNotes(String notes) 
    {
        this.notes = notes;
    }
}
