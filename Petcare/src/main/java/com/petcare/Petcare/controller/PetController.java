package com.petcare.Petcare.controller;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.petcare.Petcare.dto.PetRequest;
import com.petcare.Petcare.model.Pet;
import com.petcare.Petcare.service.PetService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/pets")
public class PetController 
{
	private final PetService petService;

    public PetController(PetService petService) 
    {
        this.petService = petService;
    }

    @PostMapping
    public ResponseEntity<Pet> addPet(
            @Valid @RequestBody PetRequest request,
            Authentication authentication) {

        Pet pet = petService.addPet(
                authentication.getName(),
                request
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(pet);
    }

    @GetMapping
    public ResponseEntity<List<Pet>> getMyPets(
            Authentication authentication) {

        return ResponseEntity.ok(
                petService.getMyPets(
                    authentication.getName()
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPet(
            @PathVariable Long id,
            Authentication authentication) {

        return ResponseEntity.ok(
                petService.getPet(
                    id,
                    authentication.getName()
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pet> updatePet(
            @PathVariable Long id,
            @Valid @RequestBody PetRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                petService.updatePet(
                    id,
                    authentication.getName(),
                    request
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(
            @PathVariable Long id,
            Authentication authentication) {

        petService.deletePet(
                id,
                authentication.getName()
        );

        return ResponseEntity.noContent().build();
    }
}
