package com.medicine.medicine.Service;

import com.medicine.medicine.Entity.DetailImportSupplier;
import com.medicine.medicine.Entity.DetailImportSupplierPK;

import java.util.List;

public interface DetailImportSupplierService {
    List<DetailImportSupplier> getAllDetailImportSuppliers();

    DetailImportSupplier getDetailImportSupplierById(DetailImportSupplierPK id);

    DetailImportSupplier addDetailImportSupplier(DetailImportSupplier detailImportSupplier);

    DetailImportSupplier updateDetailImportSupplier(DetailImportSupplier detailImportSupplier);

    void deleteDetailImportSupplier(DetailImportSupplierPK id);
}
