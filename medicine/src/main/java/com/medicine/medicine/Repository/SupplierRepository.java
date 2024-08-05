package com.medicine.medicine.Repository;

import com.medicine.medicine.Entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SupplierRepository extends JpaRepository<Supplier, String> {
    Optional<Supplier> findByName(String name);
    List<Supplier> findByStatus(String status);
}
