package com.petcare.Petcare.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petcare.Petcare.model.Pet;
import com.petcare.Petcare.model.Reminder;

public interface ReminderRepository extends JpaRepository<Reminder, Long>
{
	List<Reminder> findByPet(Pet pet);
    Optional<Reminder> findByIdAndPet(Long id, Pet pet);
}
