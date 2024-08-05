package com.medicine.medicine.Repository;

import com.medicine.medicine.Entity.DetailDiscount;
import com.medicine.medicine.Entity.DetailDiscountPK;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetailDiscountRepository extends JpaRepository<DetailDiscount, DetailDiscountPK> {
    List<DetailDiscount> findByMedicineId(String medicineId);
}