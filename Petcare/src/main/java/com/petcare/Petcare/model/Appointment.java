package com.petcare.Petcare.model;
import java.time.LocalDate;
import java.time.LocalTime;
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
@Table(name = "appointments")
public class Appointment 
{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate appointmentDate;

    @Column(nullable = false)
    private LocalTime appointmentTime;

    @Column(nullable = false)
    private String veterinarian;

    @Column(nullable = false)
    private String clinicName;

    @Column(nullable = false)
    private String reason;

    @Column(nullable = false)
    private String status = "SCHEDULED";

    private String notes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pet_id", nullable = false)
    @JsonIgnore
    private Pet pet;

    public Appointment() {   }

    public Long getId() 
    {
        return id;
    }

    public void setId(Long id) 
    {
        this.id = id;
    }

    public LocalDate getAppointmentDate() 
    {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDate appointmentDate) 
    {
        this.appointmentDate = appointmentDate;
    }

    public LocalTime getAppointmentTime() 
    {
        return appointmentTime;
    }

    public void setAppointmentTime(LocalTime appointmentTime) 
    {
        this.appointmentTime = appointmentTime;
    }

    public String getVeterinarian() {
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

    public String getReason() 
    {
        return reason;
    }

    public void setReason(String reason) 
    {
        this.reason = reason;
    }

    public String getStatus() 
    {
        return status;
    }

    public void setStatus(String status) 
    {
        this.status = status;
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
