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
import com.petcare.Petcare.dto.AppointmentRequest;
import com.petcare.Petcare.model.Appointment;
import com.petcare.Petcare.service.AppointmentService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/pets/{petId}/appointments")
public class AppointmentController 
{
	private final AppointmentService appointmentService;

    public AppointmentController(
            AppointmentService appointmentService) {

        this.appointmentService =
                appointmentService;
    }

    @PostMapping
    public ResponseEntity<Appointment>
            addAppointment(
                @PathVariable Long petId,
                @Valid @RequestBody
                    AppointmentRequest request,
                Authentication authentication) {

        Appointment appointment =
                appointmentService.addAppointment(
                    petId,
                    authentication.getName(),
                    request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(appointment);
    }

    @GetMapping
    public ResponseEntity<List<Appointment>>
            getAppointments(
                @PathVariable Long petId,
                Authentication authentication) {

        return ResponseEntity.ok(
            appointmentService.getAppointments(
                petId,
                authentication.getName()
            )
        );
    }

    @GetMapping("/{appointmentId}")
    public ResponseEntity<Appointment>
            getAppointment(
                @PathVariable Long petId,
                @PathVariable Long appointmentId,
                Authentication authentication) {

        return ResponseEntity.ok(
            appointmentService.getAppointment(
                petId,
                appointmentId,
                authentication.getName()
            )
        );
    }

    @PutMapping("/{appointmentId}")
    public ResponseEntity<Appointment>
            updateAppointment(
                @PathVariable Long petId,
                @PathVariable Long appointmentId,
                @Valid @RequestBody
                    AppointmentRequest request,
                Authentication authentication) {

        return ResponseEntity.ok(
            appointmentService.updateAppointment(
                petId,
                appointmentId,
                authentication.getName(),
                request
            )
        );
    }

    @DeleteMapping("/{appointmentId}")
    public ResponseEntity<Void>
            deleteAppointment(
                @PathVariable Long petId,
                @PathVariable Long appointmentId,
                Authentication authentication) {

        appointmentService.deleteAppointment(
                petId,
                appointmentId,
                authentication.getName()
        );

        return ResponseEntity
                .noContent()
                .build();
    }
}
