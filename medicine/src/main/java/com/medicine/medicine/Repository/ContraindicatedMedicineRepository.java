package com.medicine.medicine.Repository;

import com.medicine.medicine.Entity.ContraindicatedMedicine;
import com.medicine.medicine.Entity.ContraindicatedMedicinePK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContraindicatedMedicineRepository extends JpaRepository<ContraindicatedMedicine, ContraindicatedMedicinePK> {
    List<ContraindicatedMedicine> findByMedicineId(String medicineId);

    boolean existsById(ContraindicatedMedicinePK id);
}