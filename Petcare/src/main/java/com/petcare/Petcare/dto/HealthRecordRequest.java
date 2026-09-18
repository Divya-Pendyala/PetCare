package com.petcare.Petcare.dto;
import java.time.LocalDate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class HealthRecordRequest 
{
	 	@NotNull(message = "Record date is required")
	    private LocalDate recordDate;

	    @NotBlank(message = "Diagnosis is required")
	    private String diagnosis;

	    private String symptoms;

	    private String treatment;

	    private String medication;

	    private String veterinarian;

	    private String notes;

	    public HealthRecordRequest() {   }

	    public LocalDate getRecordDate() 
	    {
	        return recordDate;
	    }

	    public void setRecordDate(LocalDate recordDate) 
	    {
	        this.recordDate = recordDate;
	    }

	    public String getDiagnosis() 
	    {
	        return diagnosis;
	    }

	    public void setDiagnosis(String diagnosis) 
	    {
	        this.diagnosis = diagnosis;
	    }

	    public String getSymptoms() 
	    {
	        return symptoms;
	    }

	    public void setSymptoms(String symptoms) 
	    {
	        this.symptoms = symptoms;
	    }

	    public String getTreatment() 
	    {
	        return treatment;
	    }

	    public void setTreatment(String treatment) 
	    {
	        this.treatment = treatment;
	    }

	    public String getMedication() 
	    {
	        return medication;
	    }

	    public void setMedication(String medication) 
	    {
	        this.medication = medication;
	    }

	    public String getVeterinarian() 
	    {
	        return veterinarian;
	    }

	    public void setVeterinarian(String veterinarian) 
	    {
	        this.veterinarian = veterinarian;
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
