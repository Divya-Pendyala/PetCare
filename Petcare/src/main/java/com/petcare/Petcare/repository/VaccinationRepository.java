package com.petcare.Petcare.repository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.petcare.Petcare.model.Pet;
import com.petcare.Petcare.model.Vaccination;

public interface VaccinationRepository extends JpaRepository<Vaccination, Long> 
{
	List<Vaccination> findByPet(Pet pet);
    Optional<Vaccination> findByIdAndPet(Long id, Pet pet);
}
