package com.medicine.medicine.Service;

import com.medicine.medicine.Entity.EffectMedicine;
import com.medicine.medicine.Entity.EffectMedicinePK;

import java.util.List;

public interface EffectMedicineService {
    List<EffectMedicine> getAllEffectMedicines();
    EffectMedicine getEffectMedicineById(EffectMedicinePK id);
    EffectMedicine createEffectMedicine(EffectMedicine effectMedicine);
    EffectMedicine updateEffectMedicine(EffectMedicinePK id, EffectMedicine effectMedicineDetails);
    void deleteEffectMedicine(EffectMedicinePK id);
    List<EffectMedicine> findByMedicineId(String medicineId);
}
