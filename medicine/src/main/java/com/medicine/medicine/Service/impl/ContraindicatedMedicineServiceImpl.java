package com.medicine.medicine.Service.impl;

import com.medicine.medicine.Entity.ContraindicatedMedicine;
import com.medicine.medicine.Entity.ContraindicatedMedicinePK;
import com.medicine.medicine.Repository.ContraindicatedMedicineRepository;
import com.medicine.medicine.Service.ContraindicatedMedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContraindicatedMedicineServiceImpl implements ContraindicatedMedicineService {

    @Autowired
    private ContraindicatedMedicineRepository contraindicatedMedicineRepository;

    @Override
    public List<ContraindicatedMedicine> getAllContraindicatedMedicines() {
        return contraindicatedMedicineRepository.findAll();
    }

    @Override
    public ContraindicatedMedicine getContraindicatedMedicineById(ContraindicatedMedicinePK id) {
        return contraindicatedMedicineRepository.findById(id).orElse(null);
    }

    @Override
    public List<ContraindicatedMedicine> getContraindicatedMedicinesByMedicineId(String medicineId) {
        return contraindicatedMedicineRepository.findByMedicineId(medicineId);
    }

    @Override
    public ContraindicatedMedicine createContraindicatedMedicine(ContraindicatedMedicine contraindicatedMedicine) {
        if (contraindicatedMedicineRepository.existsById(contraindicatedMedicine.getId())) {
            throw new IllegalArgumentException("This contraindication is already associated with the medicine.");
        }
        return contraindicatedMedicineRepository.save(contraindicatedMedicine);
    }

    @Override
    public ContraindicatedMedicine updateContraindicatedMedicine(ContraindicatedMedicinePK id, ContraindicatedMedicine contraindicatedMedicineDetails) {
        ContraindicatedMedicine contraindicatedMedicine = contraindicatedMedicineRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("ContraindicatedMedicine not found with id: " + id));

        contraindicatedMedicine.setContraindicated(contraindicatedMedicineDetails.getContraindicated());
        contraindicatedMedicine.setMedicine(contraindicatedMedicineDetails.getMedicine());
        return contraindicatedMedicineRepository.save(contraindicatedMedicine);
    }

    @Override
    public void deleteContraindicatedMedicine(ContraindicatedMedicinePK id) {
        ContraindicatedMedicine contraindicatedMedicine = contraindicatedMedicineRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("ContraindicatedMedicine not found with id: " + id));
        contraindicatedMedicineRepository.delete(contraindicatedMedicine);
    }
}