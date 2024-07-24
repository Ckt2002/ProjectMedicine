package com.medicine.medicine.Service.impl;

import com.medicine.medicine.Entity.ImportSupplier;
import com.medicine.medicine.Repository.ImportSupplierRepository;
import com.medicine.medicine.Service.ImportSupplierService;
import com.medicine.medicine.UtilityClass.RandomIdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ImportSupplierServiceImpl implements ImportSupplierService {
    @Autowired
    private ImportSupplierRepository importSupplierRepository;

    @Override
    public List<ImportSupplier> getAllImportSuppliers() {
        return importSupplierRepository.findAll();
    }

    @Override
    public ImportSupplier getImportSupplierById(String id) {
        Optional<ImportSupplier> importSupplierOptional = importSupplierRepository.findById(id);
        return importSupplierOptional.orElseThrow(() -> new IllegalArgumentException("ImportSupplier not found"));
    }

    @Override
    public ImportSupplier addImportSupplier(ImportSupplier importSupplier) {
        importSupplier.setId(RandomIdGenerator.generateRandomId());
        importSupplier.setImportDate(LocalDateTime.now());
        return importSupplierRepository.save(importSupplier);
    }

    @Override
    public ImportSupplier updateImportSupplier(ImportSupplier importSupplier) {
        validateImportSupplierExists(importSupplier.getId());
        importSupplier.setImportDate(LocalDateTime.now());
        return importSupplierRepository.save(importSupplier);
    }

    @Override
    public void deleteImportSupplier(String id) {
        validateImportSupplierExists(id);
        importSupplierRepository.deleteById(id);
    }

    private void validateImportSupplierExists(String importSupplierId) {
        if (!importSupplierRepository.existsById(importSupplierId)) {
            throw new IllegalArgumentException("ImportSupplier not found");
        }
    }
}
