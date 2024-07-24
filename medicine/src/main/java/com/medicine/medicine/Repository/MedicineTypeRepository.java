package com.medicine.medicine.Repository;

import com.medicine.medicine.Entity.MedicineType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MedicineTypeRepository extends JpaRepository<MedicineType, Long> {
    Optional<MedicineType> findByName(String name);
}
