package com.medicine.medicine.Service;

import com.medicine.medicine.Entity.Supplier;

import java.util.List;
import java.util.Optional;

public interface SupplierService {
    public List<Supplier> getAllSuppliers();

    public Supplier getSupplierById(String id);

    public Supplier getSupplierByName(String name);

    public Supplier addSupplier(Supplier supplier);

    public Supplier updateSupplier(Supplier supplier);

    public void deleteSupplier(String id);

    List<Supplier> getActiveSuppliers();
}
