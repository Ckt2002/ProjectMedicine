package com.medicine.medicine.Repository;

import com.medicine.medicine.Entity.DetailImportSupplier;
import com.medicine.medicine.Entity.DetailImportSupplierPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DetailImportSupplierRepository extends JpaRepository<DetailImportSupplier, DetailImportSupplierPK> {
    @Query("SELECT d FROM DetailImportSupplier d WHERE d.id.importSupplierId = :importSupplierId")
    List<DetailImportSupplier> findByImportSupplierId(String importSupplierId);
}