package com.petcare.Petcare.dto;
import java.time.LocalDate;
import java.time.LocalTime;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AppointmentRequest 
{
	 	@NotNull(message = "Appointment date is required")
	    private LocalDate appointmentDate;

	    @NotNull(message = "Appointment time is required")
	    private LocalTime appointmentTime;

	    @NotBlank(message = "Veterinarian is required")
	    private String veterinarian;

	    @NotBlank(message = "Clinic name is required")
	    private String clinicName;

	    @NotBlank(message = "Reason is required")
	    private String reason;

	    private String status;

	    private String notes;

	    public AppointmentRequest() {
	    }

	    public LocalDate getAppointmentDate() {
	        return appointmentDate;
	    }

	    public void setAppointmentDate(LocalDate appointmentDate) {
	        this.appointmentDate = appointmentDate;
	    }

	    public LocalTime getAppointmentTime() {
	        return appointmentTime;
	    }

	    public void setAppointmentTime(LocalTime appointmentTime) {
	        this.appointmentTime = appointmentTime;
	    }

	    public String getVeterinarian() {
	        return veterinarian;
	    }

	    public void setVeterinarian(String veterinarian) {
	        this.veterinarian = veterinarian;
	    }

	    public String getClinicName() {
	        return clinicName;
	    }

	    public void setClinicName(String clinicName) {
	        this.clinicName = clinicName;
	    }

	    public String getReason() {
	        return reason;
	    }

	    public void setReason(String reason) {
	        this.reason = reason;
	    }

	    public String getStatus() {
	        return status;
	    }

	    public void setStatus(String status) {
	        this.status = status;
	    }

	    public String getNotes() {
	        return notes;
	    }

	    public void setNotes(String notes) {
	        this.notes = notes;
	    }
}
