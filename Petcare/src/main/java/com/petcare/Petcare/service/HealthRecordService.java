package com.petcare.Petcare.service;
import java.util.List;
import org.springframework.stereotype.Service;
import com.petcare.Petcare.dto.HealthRecordRequest;
import com.petcare.Petcare.model.HealthRecord;
import com.petcare.Petcare.model.Pet;
import com.petcare.Petcare.repository.HealthRecordRepository;

@Service
public class HealthRecordService 
{
	private final HealthRecordRepository healthRecordRepository;
    private final PetService petService;

    public HealthRecordService(
            HealthRecordRepository healthRecordRepository,
            PetService petService) 
    {

        this.healthRecordRepository = healthRecordRepository;

        this.petService = petService;
    }

    public HealthRecord addHealthRecord(
            Long petId,
            String email,
            HealthRecordRequest request) 
    {
        Pet pet = petService.getPet(petId,email);

        HealthRecord healthRecord = new HealthRecord();

        copyRequestToHealthRecord(request, healthRecord);

        healthRecord.setPet(pet);

        return healthRecordRepository.save(healthRecord);
    }

    public List<HealthRecord> getHealthRecords(Long petId, String email) 
    {
        Pet pet = petService.getPet(petId, email);

        return healthRecordRepository.findByPet(pet);
    }

    public HealthRecord getHealthRecord(
            Long petId,
            Long healthRecordId,
            String email) 
    {
        Pet pet = petService.getPet(petId, email);

        return healthRecordRepository
                .findByIdAndPet(
                        healthRecordId,
                        pet
                )
                .orElseThrow(
                    () -> new RuntimeException(
                        "Health record not found"
                    )
                );
    }

    public HealthRecord updateHealthRecord(
            Long petId,
            Long healthRecordId,
            String email,
            HealthRecordRequest request) 
    {
        HealthRecord healthRecord = getHealthRecord(petId, healthRecordId, email);

        copyRequestToHealthRecord(request, healthRecord);

        return healthRecordRepository.save(healthRecord);
    }

    public void deleteHealthRecord(Long petId, Long healthRecordId,String email) 
    {
        HealthRecord healthRecord = getHealthRecord(petId, healthRecordId, email);

        healthRecordRepository.delete(healthRecord);
    }

    private void copyRequestToHealthRecord(HealthRecordRequest request, HealthRecord healthRecord) 
    {
        healthRecord.setRecordDate(request.getRecordDate());

        healthRecord.setDiagnosis(request.getDiagnosis());

        healthRecord.setSymptoms(request.getSymptoms());

        healthRecord.setTreatment(request.getTreatment());

        healthRecord.setMedication(request.getMedication());

        healthRecord.setVeterinarian(request.getVeterinarian());

        healthRecord.setNotes(request.getNotes());
    }
}
