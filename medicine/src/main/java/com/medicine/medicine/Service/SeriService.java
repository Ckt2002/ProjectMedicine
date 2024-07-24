package com.medicine.medicine.Service;

import com.medicine.medicine.Entity.Seri;

import java.util.List;

public interface SeriService {
    List<Seri> getAllSeris();

    Seri getSeriById(String id);

    Seri addSeri(Seri seri);

    Seri updateSeri(Seri seri);

    void deleteSeri(String id);

    List<Seri> getSerisByMedicineId(String medicineId);

    long countSeriByMedicineIdAndStatus(String idMedicine, String status);

    public Seri findRandomSeriByMedicineId(String medicineId);

    Seri findRandomSeriByStatusAndMedicineId(String medicineId);

    void updateStatusById(List<String> seriIds, String status);
}
