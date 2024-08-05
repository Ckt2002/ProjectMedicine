package com.medicine.medicine.Service.impl;

import com.medicine.medicine.Entity.EffectMedicine;
import com.medicine.medicine.Entity.EffectMedicinePK;
import com.medicine.medicine.Repository.EffectMedicineRepository;
import com.medicine.medicine.Service.EffectMedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EffectMedicineServiceImpl implements EffectMedicineService {

    @Autowired
    private EffectMedicineRepository effectMedicineRepository;

    @Override
    public List<EffectMedicine> getAllEffectMedicines() {
        return effectMedicineRepository.findAll();
    }

    @Override
    public EffectMedicine getEffectMedicineById(EffectMedicinePK id) {
        return effectMedicineRepository.findById(id).orElse(null);
    }

    @Override
    public EffectMedicine createEffectMedicine(EffectMedicine effectMedicine) {
        if (effectMedicineRepository.existsById(effectMedicine.getId())) {
            throw new IllegalArgumentException("This effect is already associated with the medicine.");
        }
        return effectMedicineRepository.save(effectMedicine);
    }

    @Override
    public EffectMedicine updateEffectMedicine(EffectMedicinePK id, EffectMedicine effectMedicineDetails) {
        EffectMedicine effectMedicine = effectMedicineRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("EffectMedicine not found with id: " + id));

        effectMedicine.setEffect(effectMedicineDetails.getEffect());
        effectMedicine.setMedicine(effectMedicineDetails.getMedicine());

        return effectMedicineRepository.save(effectMedicine);
    }

    @Override
    public void deleteEffectMedicine(EffectMedicinePK id) {
        EffectMedicine effectMedicine = effectMedicineRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("EffectMedicine not found with id: " + id));
        effectMedicineRepository.delete(effectMedicine);
    }

    @Override
    public List<EffectMedicine> findByMedicineId(String medicineId) {
        return effectMedicineRepository.findByMedicineId(medicineId);
    }
}