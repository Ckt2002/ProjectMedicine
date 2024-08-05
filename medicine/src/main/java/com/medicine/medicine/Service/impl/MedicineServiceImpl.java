package com.medicine.medicine.Service.impl;

import com.medicine.medicine.Entity.*;
import com.medicine.medicine.Repository.MedicineRepository;
import com.medicine.medicine.Service.MedicineService;
import com.medicine.medicine.UtilityClass.RandomIdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicineServiceImpl implements MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    @Override
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    @Override
    public Medicine getMedicineById(String id) {
        return medicineRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Medicine not found"));
    }

    @Override
    public Medicine getMedicineByName(String name) {
        return medicineRepository.findByName(name).orElseThrow(() -> new IllegalArgumentException("Medicine not found"));
    }

    @Override
    public List<Medicine> getMedicinesByBrand(Brand brand) {
        return medicineRepository.findByBrand(brand);
    }

    @Override
    public List<Medicine> getMedicinesByType(MedicineType medicineType) {
        return medicineRepository.findByMedicineType(medicineType);
    }

    @Override
    public List<Medicine> getMedicinesByDosageForm(DosageForm dosageForm) {
        return medicineRepository.findByDosageForm(dosageForm);
    }

    @Override
    public List<Medicine> getMedicinesByManufacturer(Manufacturer manufacturer) {
        return medicineRepository.findByManufacturer(manufacturer);
    }

    @Override
    public Medicine addMedicine(Medicine medicine) {
        if (medicineRepository.findByName(medicine.getName()).isPresent()) {
            throw new IllegalArgumentException("Medicine name already exists");
        }
        medicine.setId(RandomIdGenerator.generateRandomId());
        return medicineRepository.save(medicine);
    }

    @Override
    public Medicine updateMedicine(Medicine medicine) {
        validateMedicineExists(medicine.getId());
        Optional<Medicine> existingMedicine = medicineRepository.findByName(medicine.getName());
        if (existingMedicine.isPresent() && !existingMedicine.get().getId().equals(medicine.getId())) {
            throw new IllegalArgumentException("Medicine name already exists");
        }
        return medicineRepository.save(medicine);
    }

    @Override
    public void deleteMedicine(String id) {
        validateMedicineExists(id);
        medicineRepository.deleteById(id);
    }

    @Override
    public List<Medicine> getMedicinesByStatus(String status) {
        return medicineRepository.findByStatus(status);
    }

    private void validateMedicineExists(String id) {
        if (!medicineRepository.existsById(id)) {
            throw new IllegalArgumentException("Medicine not found");
        }
    }
}
