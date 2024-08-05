package com.medicine.medicine.Repository;

import com.medicine.medicine.Entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MedicineRepository extends JpaRepository<Medicine, String> {

    Optional<Medicine> findByName(String name);

    List<Medicine> findByBrand(Brand brand);

    List<Medicine> findByMedicineType(MedicineType medicineType);

    List<Medicine> findByDosageForm(DosageForm dosageForm);

    List<Medicine> findByManufacturer(Manufacturer manufacturer);

    List<Medicine> findByStatus(String status);
}
