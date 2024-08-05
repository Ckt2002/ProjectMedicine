package com.medicine.medicine.Service;

import com.medicine.medicine.Entity.DetailDiscount;
import com.medicine.medicine.Entity.DetailDiscountPK;

import java.util.List;
import java.util.Optional;

public interface DetailDiscountService {
    
    public List<DetailDiscount> getAllDetailDiscounts();

    
    public DetailDiscount getDetailDiscountById(DetailDiscountPK id);

    
    public DetailDiscount addDetailDiscount(DetailDiscount detailDiscount);

    
    public DetailDiscount updateDetailDiscount(DetailDiscount detailDiscount);

    
    public void deleteDetailDiscount(DetailDiscountPK id);

    public List<DetailDiscount> getDetailDiscountsByMedicineId(String medicineId);
}
