package com.petcare.Petcare.controller;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.petcare.Petcare.dto.VaccinationRequest;
import com.petcare.Petcare.model.Vaccination;
import com.petcare.Petcare.service.VaccinationService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/pets/{petId}/vaccinations")
public class VaccinationController 
{
	private final VaccinationService vaccinationService;

    public VaccinationController(
            VaccinationService vaccinationService) {

        this.vaccinationService =
                vaccinationService;
    }

    @PostMapping
    public ResponseEntity<Vaccination>
            addVaccination(
                @PathVariable Long petId,
                @Valid @RequestBody
                    VaccinationRequest request,
                Authentication authentication) {

        Vaccination vaccination =
                vaccinationService.addVaccination(
                    petId,
                    authentication.getName(),
                    request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(vaccination);
    }

    @GetMapping
    public ResponseEntity<List<Vaccination>>
            getVaccinations(
                @PathVariable Long petId,
                Authentication authentication) {

        return ResponseEntity.ok(
            vaccinationService.getVaccinations(
                petId,
                authentication.getName()
            )
        );
    }

    @GetMapping("/{vaccinationId}")
    public ResponseEntity<Vaccination>
            getVaccination(
                @PathVariable Long petId,
                @PathVariable Long vaccinationId,
                Authentication authentication) {

        return ResponseEntity.ok(
            vaccinationService.getVaccination(
                petId,
                vaccinationId,
                authentication.getName()
            )
        );
    }

    @PutMapping("/{vaccinationId}")
    public ResponseEntity<Vaccination>
            updateVaccination(
                @PathVariable Long petId,
                @PathVariable Long vaccinationId,
                @Valid @RequestBody
                    VaccinationRequest request,
                Authentication authentication) {

        return ResponseEntity.ok(
            vaccinationService.updateVaccination(
                petId,
                vaccinationId,
                authentication.getName(),
                request
            )
        );
    }

    @DeleteMapping("/{vaccinationId}")
    public ResponseEntity<Void>
            deleteVaccination(
                @PathVariable Long petId,
                @PathVariable Long vaccinationId,
                Authentication authentication) {

        vaccinationService.deleteVaccination(
            petId,
            vaccinationId,
            authentication.getName()
        );

        return ResponseEntity
                .noContent()
                .build();
    }
}
