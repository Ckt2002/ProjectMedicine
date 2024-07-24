package com.medicine.medicine.Service.impl;

import com.medicine.medicine.Entity.DetailImportSupplier;
import com.medicine.medicine.Entity.DetailImportSupplierPK;
import com.medicine.medicine.Repository.DetailImportSupplierRepository;
import com.medicine.medicine.Service.DetailImportSupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetailImportSupplierServiceImpl implements DetailImportSupplierService {

    @Autowired
    private DetailImportSupplierRepository detailImportSupplierRepository;

    @Override
    public List<DetailImportSupplier> getAllDetailImportSuppliers() {
        return detailImportSupplierRepository.findAll();
    }

    @Override
    public DetailImportSupplier getDetailImportSupplierById(DetailImportSupplierPK id) {
        return detailImportSupplierRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("DetailImportSupplier not found"));
    }

    @Override
    public DetailImportSupplier addDetailImportSupplier(DetailImportSupplier detailImportSupplier) {
        return detailImportSupplierRepository.save(detailImportSupplier);
    }

    @Override
    public DetailImportSupplier updateDetailImportSupplier(DetailImportSupplier detailImportSupplier) {
        validateDetailImportSupplierExists(detailImportSupplier.getId());
        return detailImportSupplierRepository.save(detailImportSupplier);
    }

    @Override
    public void deleteDetailImportSupplier(DetailImportSupplierPK id) {
        validateDetailImportSupplierExists(id);
        detailImportSupplierRepository.deleteById(id);
    }

    private void validateDetailImportSupplierExists(DetailImportSupplierPK id) {
        if (!detailImportSupplierRepository.existsById(id)) {
            throw new IllegalArgumentException("DetailImportSupplier not found");
        }
    }
}