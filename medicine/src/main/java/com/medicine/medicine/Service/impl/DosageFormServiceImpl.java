package com.medicine.medicine.Service.impl;

import com.medicine.medicine.Entity.DosageForm;
import com.medicine.medicine.Repository.DosageFormRepository;
import com.medicine.medicine.Service.DosageFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DosageFormServiceImpl implements DosageFormService {

    @Autowired
    private DosageFormRepository dosageFormRepository;

    @Override
    public List<DosageForm> getAllDosageForms() {
        return dosageFormRepository.findAll();
    }

    @Override
    public DosageForm getDosageFormById(Long id) {
        return dosageFormRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("DosageForm not found"));
    }

    @Override
    public DosageForm getDosageFormByName(String name) {
        return dosageFormRepository.findByName(name).orElseThrow(() -> new IllegalArgumentException("DosageForm not found"));
    }

    @Override
    public DosageForm addDosageForm(DosageForm DosageForm) {
        if (dosageFormRepository.findByName(DosageForm.getName()).isPresent()) {
            throw new IllegalArgumentException("DosageForm name already exists");
        }
        return dosageFormRepository.save(DosageForm);
    }

    @Override
    public DosageForm updateDosageForm(DosageForm DosageForm) {
        validateDosageFormExists(DosageForm.getId());
        if (dosageFormRepository.findByName(DosageForm.getName()).isPresent()) {
            throw new IllegalArgumentException("DosageForm name already exists");
        }
        return dosageFormRepository.save(DosageForm);
    }

    @Override
    public void deleteDosageForm(Long id) {
        validateDosageFormExists(id);
        dosageFormRepository.deleteById(id);
    }

    private void validateDosageFormExists(Long id) {
        if (!dosageFormRepository.existsById(id)) {
            throw new IllegalArgumentException("DosageForm not found");
        }
    }
}
