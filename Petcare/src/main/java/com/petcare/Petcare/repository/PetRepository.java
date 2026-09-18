package com.petcare.Petcare.repository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.petcare.Petcare.model.Pet;
import com.petcare.Petcare.model.User;

public interface PetRepository extends JpaRepository<Pet, Long>
{
	List<Pet> findByUser(User user);

    Optional<Pet> findByIdAndUser(
            Long id,
            User user
    );
}
