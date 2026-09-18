package com.petcare.Petcare.dto;
import java.time.LocalDate;
import java.time.LocalTime;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ReminderRequest 
{
	@NotBlank(message = "Reminder title is required")
    private String title;

    @NotBlank(message = "Reminder type is required")
    private String reminderType;

    @NotNull(message = "Reminder date is required")
    private LocalDate reminderDate;

    private LocalTime reminderTime;

    private boolean completed;

    private String notes;

    public ReminderRequest() 
    {
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
}
