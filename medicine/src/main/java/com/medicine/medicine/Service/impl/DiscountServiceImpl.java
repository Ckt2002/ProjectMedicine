package com.medicine.medicine.Service.impl;

import com.medicine.medicine.Entity.Discount;
import com.medicine.medicine.Repository.DiscountRepository;
import com.medicine.medicine.Service.DiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DiscountServiceImpl implements DiscountService {

    @Autowired
    private DiscountRepository discountRepository;

    @Override
    public List<Discount> getAllDiscounts() {
        return discountRepository.findAll();
    }

    @Override
    public Discount getDiscountById(Long id) {
        Optional<Discount> discount = discountRepository.findById(id);
        return discount.orElseThrow(() -> new IllegalArgumentException("Discount not found"));
    }

    @Override
    public Discount addDiscount(Discount discount) {

        validateNameExists(discount.getName());

        if (discount.getPercentage() < 0 || discount.getPercentage() > 100) {
            throw new IllegalArgumentException("Discount percentage must be between 0 and 100");
        }
        return discountRepository.save(discount);
    }

    @Override
    public Discount updateDiscount(Discount discount) {
        validateDiscountExists(discount.getId());

        if (discount.getPercentage() < 0 || discount.getPercentage() > 100) {
            throw new IllegalArgumentException("Discount percentage must be between 0 and 100");
        }
        return discountRepository.save(discount);
    }

    @Override
    public void deleteDiscount(Long id) {
        validateDiscountExists(id);
        discountRepository.deleteById(id);
    }

    private void validateDiscountExists(Long discountId) {
        if (!discountRepository.existsById(discountId)) {
            throw new IllegalArgumentException("Discount not found");
        }
    }

    private void validateNameExists(String name) {
        Optional<Discount> existingDiscount = discountRepository.findByName(name);
        if (existingDiscount.isPresent()) {
            throw new IllegalArgumentException("Discount name already exists");
        }
    }
}
