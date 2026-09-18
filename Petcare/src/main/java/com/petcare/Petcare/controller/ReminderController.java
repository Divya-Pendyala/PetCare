package com.petcare.Petcare.controller;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.petcare.Petcare.dto.ReminderRequest;
import com.petcare.Petcare.model.Reminder;
import com.petcare.Petcare.service.ReminderService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/pets/{petId}/reminders")
public class ReminderController 
{
	private final ReminderService reminderService;

    public ReminderController(ReminderService reminderService) 
    {
        this.reminderService = reminderService;
    }

    @PostMapping
    public ResponseEntity<Reminder>
            addReminder(
                @PathVariable Long petId,
                @Valid @RequestBody
                    ReminderRequest request,
                Authentication authentication) {

        Reminder reminder =
                reminderService.addReminder(
                    petId,
                    authentication.getName(),
                    request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(reminder);
    }

    @GetMapping
    public ResponseEntity<List<Reminder>>
            getReminders(
                @PathVariable Long petId,
                Authentication authentication) {

        return ResponseEntity.ok(
            reminderService.getReminders(
                petId,
                authentication.getName()
            )
        );
    }

    @GetMapping("/{reminderId}")
    public ResponseEntity<Reminder>
            getReminder(
                @PathVariable Long petId,
                @PathVariable Long reminderId,
                Authentication authentication) {

        return ResponseEntity.ok(
            reminderService.getReminder(
                petId,
                reminderId,
                authentication.getName()
            )
        );
    }

    @PutMapping("/{reminderId}")
    public ResponseEntity<Reminder>
            updateReminder(
                @PathVariable Long petId,
                @PathVariable Long reminderId,
                @Valid @RequestBody
                    ReminderRequest request,
                Authentication authentication) {

        return ResponseEntity.ok(
            reminderService.updateReminder(
                petId,
                reminderId,
                authentication.getName(),
                request
            )
        );
    }

    @DeleteMapping("/{reminderId}")
    public ResponseEntity<Void>
            deleteReminder(
                @PathVariable Long petId,
                @PathVariable Long reminderId,
                Authentication authentication) {

        reminderService.deleteReminder(
                petId,
                reminderId,
                authentication.getName()
        );

        return ResponseEntity
                .noContent()
                .build();
    }
}
