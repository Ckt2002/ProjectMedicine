package com.medicine.medicine.Repository;

import com.medicine.medicine.Entity.EffectMedicine;
import com.medicine.medicine.Entity.EffectMedicinePK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EffectMedicineRepository extends JpaRepository<EffectMedicine, EffectMedicinePK> {
    List<EffectMedicine> findByMedicineId(String medicineId);

    boolean existsById(EffectMedicinePK id);
}