package com.medicine.medicine.Service;

import com.medicine.medicine.Entity.Discount;

import java.util.List;

public interface DiscountService {
    List<Discount> getAllDiscounts();
    Discount getDiscountById(Long id);
    Discount addDiscount(Discount discount);
    Discount updateDiscount(Discount discount);
    void deleteDiscount(Long id);
}
