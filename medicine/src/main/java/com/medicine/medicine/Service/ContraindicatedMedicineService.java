package com.medicine.medicine.Service;

import com.medicine.medicine.Entity.ContraindicatedMedicine;
import com.medicine.medicine.Entity.ContraindicatedMedicinePK;

import java.util.List;

public interface ContraindicatedMedicineService {
    List<ContraindicatedMedicine> getAllContraindicatedMedicines();
    ContraindicatedMedicine getContraindicatedMedicineById(ContraindicatedMedicinePK id);
    List<ContraindicatedMedicine> getContraindicatedMedicinesByMedicineId(String medicineId);
    ContraindicatedMedicine createContraindicatedMedicine(ContraindicatedMedicine contraindicatedMedicine);
    ContraindicatedMedicine updateContraindicatedMedicine(ContraindicatedMedicinePK id, ContraindicatedMedicine contraindicatedMedicineDetails);
    void deleteContraindicatedMedicine(ContraindicatedMedicinePK id);
}
