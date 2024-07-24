package com.medicine.medicine.Service.impl;

import com.medicine.medicine.Entity.Seri;
import com.medicine.medicine.Repository.SeriRepository;
import com.medicine.medicine.Service.SeriService;
import com.medicine.medicine.UtilityClass.RandomIdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class SeriServiceImpl implements SeriService {
    @Autowired
    private SeriRepository seriRepository;

    @Override
    public List<Seri> getAllSeris() {
        return seriRepository.findAll();
    }

    @Override
    public Seri getSeriById(String id) {
        return seriRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Seri not found"));
    }

    @Override
    public Seri addSeri(Seri seri) {
        seri.setId(RandomIdGenerator.generateRandomId());
        return seriRepository.save(seri);
    }

    @Override
    public Seri updateSeri(Seri seri) {
        validateSeriExists(seri.getId());
        return seriRepository.save(seri);
    }

    @Override
    public void deleteSeri(String id) {
        validateSeriExists(id);
        seriRepository.deleteById(id);
    }

    @Override
    public List<Seri> getSerisByMedicineId(String medicineId) {
        return seriRepository.findByMedicine_Id(medicineId);
    }

    @Override
    public long countSeriByMedicineIdAndStatus(String idMedicine, String status) {
        return seriRepository.countByMedicineIdAndStatus(idMedicine, status);
    }

    @Override
    public Seri findRandomSeriByMedicineId(String medicineId) {
        List<Seri> seriList = seriRepository.findByMedicineId(medicineId);
        if (seriList.isEmpty()) {
            return null; // Hoặc ném ngoại lệ nếu cần thiết
        }
        Random random = new Random();
        return seriList.get(random.nextInt(seriList.size()));
    }

    @Override
    public Seri findRandomSeriByStatusAndMedicineId(String medicineId) {
        List<Seri> seriList = seriRepository.findByMedicineIdAndStatusNew(medicineId);
        if (seriList.isEmpty()) {
            return null; // Hoặc ném ngoại lệ nếu cần thiết
        }
        Random random = new Random();
        return seriList.get(random.nextInt(seriList.size()));
    }

    @Override
    public void updateStatusById(List<String> seriIds, String status) {
        for (String seriId : seriIds) {
            Seri seri = seriRepository.findById(seriId)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid Seri ID: " + seriId));
            seri.setStatus(status);
            seriRepository.save(seri);
        }
    }

    private void validateSeriExists(String id) {
        if (!seriRepository.existsById(id)) {
            throw new IllegalArgumentException("Seri not found");
        }
    }
}
