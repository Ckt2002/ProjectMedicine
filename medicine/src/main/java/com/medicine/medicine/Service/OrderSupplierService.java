package com.medicine.medicine.Service;

import com.medicine.medicine.Entity.OrderSupplier;
import com.medicine.medicine.UtilityClass.RandomIdGenerator;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderSupplierService {
    
    public List<OrderSupplier> getAllOrderSuppliers();

    
    public OrderSupplier getOrderSupplierById(String id);

    
    public OrderSupplier addOrderSupplier(OrderSupplier orderSupplier);

    
    public OrderSupplier updateOrderSupplier(OrderSupplier orderSupplier);

    
    public void deleteOrderSupplier(String id);
}
