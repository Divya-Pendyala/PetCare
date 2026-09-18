package com.petcare.Petcare.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.petcare.Petcare.dto.AppointmentRequest;
import com.petcare.Petcare.model.Appointment;
import com.petcare.Petcare.model.Pet;
import com.petcare.Petcare.repository.AppointmentRepository;

@Service
public class AppointmentService 
{
	private final AppointmentRepository appointmentRepository;
    private final PetService petService;

    public AppointmentService(
            AppointmentRepository appointmentRepository,
            PetService petService) 
    {
        this.appointmentRepository = appointmentRepository;
        this.petService = petService;
    }

    public Appointment addAppointment(
            Long petId,
            String email,
            AppointmentRequest request) 
    {
        Pet pet = petService.getPet(petId, email);
        Appointment appointment = new Appointment();
        copyRequestToAppointment(request, appointment);
        appointment.setPet(pet);
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAppointments(Long petId, String email) 
    {
        Pet pet = petService.getPet(petId, email);
        return appointmentRepository.findByPet(pet);
    }

    public Appointment getAppointment(
            Long petId,
            Long appointmentId,
            String email) 
    {

        Pet pet = petService.getPet(petId, email );
        return appointmentRepository
                .findByIdAndPet(
                        appointmentId,
                        pet
                )
                .orElseThrow(
                    () -> new RuntimeException(
                        "Appointment not found"
                    )
                );
    }

    public Appointment updateAppointment(
            Long petId,
            Long appointmentId,
            String email,
            AppointmentRequest request) 
    {
        Appointment appointment =
                getAppointment(
                    petId,
                    appointmentId,
                    email
                );

        copyRequestToAppointment(
                request,
                appointment
        );

        return appointmentRepository.save(appointment);
    }

    public void deleteAppointment(
            Long petId,
            Long appointmentId,
            String email) 
    {
        Appointment appointment =
                getAppointment(
                    petId,
                    appointmentId,
                    email
                );

        appointmentRepository.delete(appointment);
    }

    private void copyRequestToAppointment(
            AppointmentRequest request,
            Appointment appointment) {

        appointment.setAppointmentDate(
                request.getAppointmentDate()
        );

        appointment.setAppointmentTime(
                request.getAppointmentTime()
        );

        appointment.setVeterinarian(
                request.getVeterinarian()
        );

        appointment.setClinicName(
                request.getClinicName()
        );

        appointment.setReason(
                request.getReason()
        );

        if (request.getStatus() == null ||
                request.getStatus().isBlank()) {

            appointment.setStatus("SCHEDULED");

        } 
        else 
        {
            appointment.setStatus(request.getStatus());
        }

        appointment.setNotes(request.getNotes());
    }
}
