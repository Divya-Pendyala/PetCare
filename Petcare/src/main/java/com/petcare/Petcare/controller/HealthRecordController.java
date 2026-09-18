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
import com.petcare.Petcare.dto.HealthRecordRequest;
import com.petcare.Petcare.model.HealthRecord;
import com.petcare.Petcare.service.HealthRecordService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/pets/{petId}/health-records")
public class HealthRecordController 
{
	private final HealthRecordService healthRecordService;

    public HealthRecordController(
            HealthRecordService healthRecordService) {

        this.healthRecordService =
                healthRecordService;
    }

    @PostMapping
    public ResponseEntity<HealthRecord>
            addHealthRecord(
                @PathVariable Long petId,
                @Valid @RequestBody
                    HealthRecordRequest request,
                Authentication authentication) {

        HealthRecord healthRecord =
                healthRecordService.addHealthRecord(
                    petId,
                    authentication.getName(),
                    request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(healthRecord);
    }

    @GetMapping
    public ResponseEntity<List<HealthRecord>>
            getHealthRecords(
                @PathVariable Long petId,
                Authentication authentication) {

        return ResponseEntity.ok(
            healthRecordService.getHealthRecords(
                petId,
                authentication.getName()
            )
        );
    }

    @GetMapping("/{healthRecordId}")
    public ResponseEntity<HealthRecord>
            getHealthRecord(
                @PathVariable Long petId,
                @PathVariable Long healthRecordId,
                Authentication authentication) {

        return ResponseEntity.ok(
            healthRecordService.getHealthRecord(
                petId,
                healthRecordId,
                authentication.getName()
            )
        );
    }

    @PutMapping("/{healthRecordId}")
    public ResponseEntity<HealthRecord>
            updateHealthRecord(
                @PathVariable Long petId,
                @PathVariable Long healthRecordId,
                @Valid @RequestBody
                    HealthRecordRequest request,
                Authentication authentication) {

        return ResponseEntity.ok(
            healthRecordService.updateHealthRecord(
                petId,
                healthRecordId,
                authentication.getName(),
                request
            )
        );
    }

    @DeleteMapping("/{healthRecordId}")
    public ResponseEntity<Void>
            deleteHealthRecord(
                @PathVariable Long petId,
                @PathVariable Long healthRecordId,
                Authentication authentication) {

        healthRecordService.deleteHealthRecord(
                petId,
                healthRecordId,
                authentication.getName()
        );

        return ResponseEntity
                .noContent()
                .build();
    }
}
