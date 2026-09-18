package com.petcare.Petcare.service;
import java.util.List;
import org.springframework.stereotype.Service;
import com.petcare.Petcare.dto.PetRequest;
import com.petcare.Petcare.model.Pet;
import com.petcare.Petcare.model.User;
import com.petcare.Petcare.repository.PetRepository;
import com.petcare.Petcare.repository.UserRepository;

@Service
public class PetService 
{
	private final PetRepository petRepository;
    private final UserRepository userRepository;

    public PetService(PetRepository petRepository, UserRepository userRepository) 
    {
        this.petRepository = petRepository;
        this.userRepository = userRepository;
    }

    private User getUser(String email) 
    {
        return userRepository
                .findByEmail(email)
                .orElseThrow(
                    () -> new RuntimeException(
                        "User not found"
                    )
                );
    }

    public Pet addPet(String email, PetRequest request) 
    {
        User user = getUser(email);
        Pet pet = new Pet();
        copyRequestToPet(request, pet);
        pet.setUser(user);
        return petRepository.save(pet);
    }

    public List<Pet> getMyPets(String email) 
    {
        User user = getUser(email);
        return petRepository.findByUser(user);
    }

    public Pet getPet(Long id, String email) 
    {
        User user = getUser(email);
        
        return petRepository
                .findByIdAndUser(id, user)
                .orElseThrow(
                    () -> new RuntimeException(
                        "Pet not found"
                    )
                );
    }

    public Pet updatePet(Long id, String email, PetRequest request) 
    {
        Pet pet = getPet(id, email);
        copyRequestToPet(request, pet);
        return petRepository.save(pet);
    }

    public void deletePet(Long id, String email) 
    {
        Pet pet = getPet(id, email);
        petRepository.delete(pet);
    }

    private void copyRequestToPet(PetRequest request, Pet pet) 
    {
        pet.setName(request.getName());
        pet.setSpecies(request.getSpecies());
        pet.setBreed(request.getBreed());
        pet.setDateOfBirth(request.getDateOfBirth());
        pet.setGender(request.getGender());
        pet.setWeight(request.getWeight());
        pet.setColor(request.getColor());
        pet.setNotes(request.getNotes());
        pet.setImageUrl(request.getImageUrl());
    }
}
