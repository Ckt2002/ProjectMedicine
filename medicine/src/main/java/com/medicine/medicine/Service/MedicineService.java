package com.medicine.medicine.Service;

import com.medicine.medicine.Entity.*;

import java.util.List;

public interface MedicineService {
    List<Medicine> getAllMedicines();

    Medicine getMedicineById(String id);

    Medicine getMedicineByName(String name);

    List<Medicine> getMedicinesByBrand(Brand brand);

    List<Medicine> getMedicinesByType(MedicineType medicineType);

    List<Medicine> getMedicinesByDosageForm(DosageForm dosageForm);

    List<Medicine> getMedicinesByManufacturer(Manufacturer manufacturer);

    Medicine addMedicine(Medicine medicine);

    Medicine updateMedicine(Medicine medicine);

    void deleteMedicine(String id);
}

