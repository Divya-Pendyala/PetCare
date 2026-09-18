package com.petcare.Petcare.repository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.petcare.Petcare.model.Appointment;
import com.petcare.Petcare.model.Pet;

public interface AppointmentRepository extends JpaRepository<Appointment, Long>
{
	List<Appointment> findByPet(Pet pet);
    Optional<Appointment> findByIdAndPet(Long id,Pet pet);
}
