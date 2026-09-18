package com.petcare.Petcare.model;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "vaccinations")
public class Vaccination 
{
	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(nullable = false)
	    private String vaccineName;

	    private LocalDate dateGiven;

	    private LocalDate nextDueDate;

	    private String veterinarian;

	    private String clinicName;

	    private String notes;

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "pet_id", nullable = false)
	    @JsonIgnore
	    private Pet pet;

	    public Vaccination() {    }

	    public Long getId() 
	    {
	        return id;
	    }

	    public void setId(Long id) 
	    {
	        this.id = id;
	    }

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

	    public void setDateGiven(LocalDate dateGiven) {
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

	    public Pet getPet() 
	    {
	        return pet;
	    }

	    public void setPet(Pet pet) 
	    {
	        this.pet = pet;
	    }
}
