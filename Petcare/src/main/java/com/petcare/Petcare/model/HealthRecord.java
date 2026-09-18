package com.petcare.Petcare.model;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "health_records")
public class HealthRecord 
{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate recordDate;

    @Column(nullable = false)
    private String diagnosis;

    private String symptoms;

    private String treatment;

    private String medication;

    private String veterinarian;

    private String notes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pet_id", nullable = false)
    @JsonIgnore
    private Pet pet;

    public HealthRecord() {   }

    public Long getId() 
    {
        return id;
    }

    public void setId(Long id) 
    {
        this.id = id;
    }

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

    public Pet getPet() 
    {
        return pet;
    }

    public void setPet(Pet pet) 
    {
        this.pet = pet;
    }
}
