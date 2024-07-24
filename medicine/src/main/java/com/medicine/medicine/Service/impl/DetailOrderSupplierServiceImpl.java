package com.medicine.medicine.Service.impl;

import com.medicine.medicine.Entity.DetailOrderSupplier;
import com.medicine.medicine.Entity.DetailOrderSupplierPK;
import com.medicine.medicine.Repository.DetailOrderSupplierRepository;
import com.medicine.medicine.Service.DetailOrderSupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetailOrderSupplierServiceImpl implements DetailOrderSupplierService {

    @Autowired
    private DetailOrderSupplierRepository detailOrderSupplierRepository;

    @Override
    public List<DetailOrderSupplier> getAllDetailOrderSuppliers() {
        return detailOrderSupplierRepository.findAll();
    }

    @Override
    public DetailOrderSupplier getDetailOrderSupplierById(DetailOrderSupplierPK id) {
        return detailOrderSupplierRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("DetailOrderSupplier not found"));
    }

    @Override
    public DetailOrderSupplier addDetailOrderSupplier(DetailOrderSupplier detailOrderSupplier) {
        return detailOrderSupplierRepository.save(detailOrderSupplier);
    }

    @Override
    public DetailOrderSupplier updateDetailOrderSupplier(DetailOrderSupplier detailOrderSupplier) {
        validateDetailOrderSupplierExists(detailOrderSupplier.getId());
        return detailOrderSupplierRepository.save(detailOrderSupplier);
    }

    @Override
    public void deleteDetailOrderSupplier(DetailOrderSupplierPK id) {
        validateDetailOrderSupplierExists(id);
        detailOrderSupplierRepository.deleteById(id);
    }

    private void validateDetailOrderSupplierExists(DetailOrderSupplierPK id) {
        if (!detailOrderSupplierRepository.existsById(id)) {
            throw new IllegalArgumentException("DetailOrderSupplier not found");
        }
    }
}