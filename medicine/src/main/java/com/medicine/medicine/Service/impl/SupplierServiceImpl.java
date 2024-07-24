package com.medicine.medicine.Service.impl;

import com.medicine.medicine.Entity.Supplier;
import com.medicine.medicine.Repository.SupplierRepository;
import com.medicine.medicine.Service.SupplierService;
import com.medicine.medicine.UtilityClass.RandomIdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupplierServiceImpl implements SupplierService {
    @Autowired
    private SupplierRepository supplierRepository;

    @Override
    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    @Override
    public Supplier getSupplierById(String id) {
        Optional<Supplier> supplierOptional = supplierRepository.findById(id);
        return supplierOptional.orElseThrow(() -> new IllegalArgumentException("Supplier not found"));
    }

    @Override
    public Supplier getSupplierByName(String name) {
        Optional<Supplier> supplierOptional = supplierRepository.findByName(name);
        return supplierOptional.orElseThrow(() -> new IllegalArgumentException("Supplier not found"));
    }

    @Override
    public Supplier addSupplier(Supplier supplier) {
        if (supplierRepository.findByName(supplier.getName()).isPresent()) {
            throw new IllegalArgumentException("Supplier name already exists");
        }
        supplier.setId(RandomIdGenerator.generateRandomId());
        return supplierRepository.save(supplier);
    }

    @Override
    public Supplier updateSupplier(Supplier supplier) {
        validateSupplierExists(supplier.getId());
        return supplierRepository.save(supplier);
    }

    @Override
    public void deleteSupplier(String id) {
        validateSupplierExists(id);
        supplierRepository.deleteById(id);
    }

    private void validateSupplierExists(String supplierId) {
        if (!supplierRepository.existsById(supplierId)) {
            throw new IllegalArgumentException("Supplier not found");
        }
    }
}
