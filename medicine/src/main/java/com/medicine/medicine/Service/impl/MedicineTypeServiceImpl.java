package com.medicine.medicine.Service.impl;

import com.medicine.medicine.Entity.MedicineType;
import com.medicine.medicine.Repository.MedicineTypeRepository;
import com.medicine.medicine.Service.MedicineTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineTypeServiceImpl implements MedicineTypeService {
    @Autowired
    private MedicineTypeRepository medicineTypeRepository;

    @Override
    public List<MedicineType> getAllMedicineTypes() {
        return medicineTypeRepository.findAll();
    }

    @Override
    public MedicineType getMedicineTypeById(Long id) {
        return medicineTypeRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("MedicineType not found"));
    }

    @Override
    public MedicineType getMedicineTypeByName(String name) {
        return medicineTypeRepository.findByName(name).orElseThrow(() -> new IllegalArgumentException("MedicineType not found"));
    }

    @Override
    public MedicineType addMedicineType(MedicineType MedicineType) {
        if (medicineTypeRepository.findByName(MedicineType.getName()).isPresent()) {
            throw new IllegalArgumentException("MedicineType name already exists");
        }
        return medicineTypeRepository.save(MedicineType);
    }

    @Override
    public MedicineType updateMedicineType(MedicineType MedicineType) {
        validateMedicineTypeExists(MedicineType.getId());
        if (medicineTypeRepository.findByName(MedicineType.getName()).isPresent()) {
            throw new IllegalArgumentException("MedicineType name already exists");
        }
        return medicineTypeRepository.save(MedicineType);
    }

    @Override
    public void deleteMedicineType(Long id) {
        validateMedicineTypeExists(id);
        medicineTypeRepository.deleteById(id);
    }

    private void validateMedicineTypeExists(Long id) {
        if (!medicineTypeRepository.existsById(id)) {
            throw new IllegalArgumentException("MedicineType not found");
        }
    }
}
