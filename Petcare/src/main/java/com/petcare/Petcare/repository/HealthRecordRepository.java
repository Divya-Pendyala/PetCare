package com.petcare.Petcare.repository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.petcare.Petcare.model.HealthRecord;
import com.petcare.Petcare.model.Pet;

public interface HealthRecordRepository extends JpaRepository<HealthRecord, Long>
{
	List<HealthRecord> findByPet(Pet pet);
    Optional<HealthRecord> findByIdAndPet(Long id, Pet pet);
}
