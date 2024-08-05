package com.medicine.medicine.Service.impl;

import com.medicine.medicine.Entity.DetailDiscount;
import com.medicine.medicine.Entity.DetailDiscountPK;
import com.medicine.medicine.Repository.DetailDiscountRepository;
import com.medicine.medicine.Service.DetailDiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DetailDiscountServiceImpl implements DetailDiscountService {

    @Autowired
    private DetailDiscountRepository detailDiscountRepository;

    @Override
    public List<DetailDiscount> getAllDetailDiscounts() {
        return detailDiscountRepository.findAll();
    }

    @Override
    public DetailDiscount getDetailDiscountById(DetailDiscountPK id) {
        Optional<DetailDiscount> detailDiscount = detailDiscountRepository.findById(id);
        return detailDiscount.orElse(null);
    }

    @Override
    public DetailDiscount addDetailDiscount(DetailDiscount detailDiscount) {
        try {
            return detailDiscountRepository.save(detailDiscount);
        } catch (Exception e) {
            throw new RuntimeException("Failed to add detail discount: " + e.getMessage());
        }
    }

    @Override
    public DetailDiscount updateDetailDiscount(DetailDiscount detailDiscount) {
        try {
            return detailDiscountRepository.save(detailDiscount);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update detail discount: " + e.getMessage());
        }
    }

    @Override
    public void deleteDetailDiscount(DetailDiscountPK id) {
        try {
            detailDiscountRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete detail discount: " + e.getMessage());
        }
    }

    @Override
    public List<DetailDiscount> getDetailDiscountsByMedicineId(String medicineId) {
        return detailDiscountRepository.findByMedicineId(medicineId);
    }
}
