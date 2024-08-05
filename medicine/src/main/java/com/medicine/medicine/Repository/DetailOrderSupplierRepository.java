package com.medicine.medicine.Repository;

import com.medicine.medicine.Entity.DetailOrderSupplier;
import com.medicine.medicine.Entity.DetailOrderSupplierPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DetailOrderSupplierRepository extends JpaRepository<DetailOrderSupplier, DetailOrderSupplierPK> {
    @Query("SELECT d FROM DetailOrderSupplier d WHERE d.id.orderSupplierId = :orderSupplierId")
    List<DetailOrderSupplier> findByOrderSupplierId(String orderSupplierId);
}