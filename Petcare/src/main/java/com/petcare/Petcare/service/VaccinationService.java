package com.petcare.Petcare.service;
import java.util.List;
import org.springframework.stereotype.Service;
import com.petcare.Petcare.dto.VaccinationRequest;
import com.petcare.Petcare.model.Pet;
import com.petcare.Petcare.model.Vaccination;
import com.petcare.Petcare.repository.VaccinationRepository;

@Service
public class VaccinationService 
{
	private final VaccinationRepository vaccinationRepository;
    private final PetService petService;

    public VaccinationService(VaccinationRepository vaccinationRepository, PetService petService) 
    {
        this.vaccinationRepository = vaccinationRepository;
        this.petService = petService;
    }

    public Vaccination addVaccination(Long petId, String email, VaccinationRequest request) 
    {
        Pet pet = petService.getPet(petId, email);
        Vaccination vaccination = new Vaccination();

        copyRequestToVaccination(request, vaccination);

        vaccination.setPet(pet);

        return vaccinationRepository.save(vaccination);
    }

    public List<Vaccination> getVaccinations(Long petId, String email) 
    {
        Pet pet = petService.getPet(petId,email);
        return vaccinationRepository.findByPet(pet);
    }

    public Vaccination getVaccination(Long petId, Long vaccinationId, String email) 
    {
        Pet pet = petService.getPet(petId, email);
        return vaccinationRepository.findByIdAndPet(vaccinationId, pet)
                .orElseThrow(
                    () -> new RuntimeException(
                        "Vaccination not found"
                    )
                );
    }

    public Vaccination updateVaccination(
            Long petId,
            Long vaccinationId,
            String email,
            VaccinationRequest request) 
    {
        Vaccination vaccination =
                getVaccination(
                    petId,
                    vaccinationId,
                    email
                );

        copyRequestToVaccination(request,vaccination);

        return vaccinationRepository.save(vaccination);
    }

    public void deleteVaccination(
            Long petId,
            Long vaccinationId,
            String email) 
    {

        Vaccination vaccination =
                getVaccination(
                    petId,
                    vaccinationId,
                    email
                );

        vaccinationRepository.delete(vaccination);
    }

    private void copyRequestToVaccination(
            VaccinationRequest request,
            Vaccination vaccination) 
    {

        vaccination.setVaccineName(request.getVaccineName());

        vaccination.setDateGiven(request.getDateGiven());

        vaccination.setNextDueDate(request.getNextDueDate());

        vaccination.setVeterinarian(request.getVeterinarian());

        vaccination.setClinicName(request.getClinicName());

        vaccination.setNotes(request.getNotes());
    }
}
