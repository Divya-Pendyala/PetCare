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
@Table(name = "reminders")
public class Reminder 
{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String reminderType;

    @Column(nullable = false)
    private LocalDate reminderDate;

    private LocalTime reminderTime;

    @Column(nullable = false)
    private boolean completed = false;

    private String notes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pet_id", nullable = false)
    @JsonIgnore
    private Pet pet;

    public Reminder() {   }

    public Long getId() 
    {
        return id;
    }

    public void setId(Long id) 
    {
        this.id = id;
    }

    public String getTitle() 
    {
        return title;
    }

    public void setTitle(String title) 
    {
        this.title = title;
    }

    public String getReminderType() 
    {
        return reminderType;
    }

    public void setReminderType(String reminderType) 
    {
        this.reminderType = reminderType;
    }

    public LocalDate getReminderDate() 
    {
        return reminderDate;
    }

    public void setReminderDate(LocalDate reminderDate) 
    {
        this.reminderDate = reminderDate;
    }

    public LocalTime getReminderTime() 
    {
        return reminderTime;
    }

    public void setReminderTime(LocalTime reminderTime) 
    {
        this.reminderTime = reminderTime;
    }

    public boolean isCompleted() 
    {
        return completed;
    }

    public void setCompleted(boolean completed) 
    {
        this.completed = completed;
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
