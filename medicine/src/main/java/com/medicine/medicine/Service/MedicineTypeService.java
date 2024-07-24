package com.medicine.medicine.Service;

import com.medicine.medicine.Entity.MedicineType;

import java.util.List;

public interface MedicineTypeService {

    List<MedicineType> getAllMedicineTypes();

    MedicineType getMedicineTypeById(Long id);

    MedicineType getMedicineTypeByName(String name);

    MedicineType addMedicineType(MedicineType MedicineType);

    MedicineType updateMedicineType(MedicineType MedicineType);

    void deleteMedicineType(Long id);
}
