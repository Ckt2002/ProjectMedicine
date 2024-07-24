package com.medicine.medicine.Service;

import com.medicine.medicine.Entity.ImportSupplier;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ImportSupplierService {
    public List<ImportSupplier> getAllImportSuppliers();

    public ImportSupplier getImportSupplierById(String id);

    public ImportSupplier addImportSupplier(ImportSupplier importSupplier);

    public ImportSupplier updateImportSupplier(ImportSupplier importSupplier);

    public void deleteImportSupplier(String id);
}
