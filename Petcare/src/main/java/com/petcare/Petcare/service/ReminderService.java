package com.petcare.Petcare.service;
import java.util.List;
import org.springframework.stereotype.Service;
import com.petcare.Petcare.dto.ReminderRequest;
import com.petcare.Petcare.model.Pet;
import com.petcare.Petcare.model.Reminder;
import com.petcare.Petcare.repository.ReminderRepository;

@Service
public class ReminderService 
{
	private final ReminderRepository reminderRepository;
    private final PetService petService;

    public ReminderService(
            ReminderRepository reminderRepository,
            PetService petService) {

        this.reminderRepository = reminderRepository;

        this.petService = petService;
    }

    public Reminder addReminder(
            Long petId,
            String email,
            ReminderRequest request) {

        Pet pet = petService.getPet(petId,email);

        Reminder reminder =new Reminder();

        copyRequestToReminder(request,reminder);

        reminder.setPet(pet);

        return reminderRepository.save(reminder);
    }

    public List<Reminder> getReminders(
            Long petId,
            String email) 
    {    	
        Pet pet = petService.getPet(petId, email);
        return reminderRepository.findByPet(pet);
    }

    public Reminder getReminder(
            Long petId,
            Long reminderId,
            String email) {

        Pet pet = petService.getPet(
                petId,
                email
        );

        return reminderRepository
                .findByIdAndPet(
                        reminderId,
                        pet
                )
                .orElseThrow(
                    () -> new RuntimeException(
                        "Reminder not found"
                    )
                );
    }

    public Reminder updateReminder(
            Long petId,
            Long reminderId,
            String email,
            ReminderRequest request) 
    {
        Reminder reminder = getReminder(petId,reminderId,email);

        copyRequestToReminder(request,reminder);

        return reminderRepository.save(reminder);
    }

    public void deleteReminder(
            Long petId,
            Long reminderId,
            String email) 
    {
        Reminder reminder = getReminder(petId,reminderId,email);

        reminderRepository.delete(reminder);
    }

    private void copyRequestToReminder( ReminderRequest request,Reminder reminder) 
    {
        reminder.setTitle(request.getTitle());

        reminder.setReminderType(request.getReminderType());

        reminder.setReminderDate(request.getReminderDate());

        reminder.setReminderTime(request.getReminderTime());

        reminder.setCompleted(                request.isCompleted());

        reminder.setNotes(request.getNotes());
    }
}
