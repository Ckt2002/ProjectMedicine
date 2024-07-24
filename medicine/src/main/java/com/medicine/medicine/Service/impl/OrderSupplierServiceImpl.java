package com.medicine.medicine.Service.impl;

import com.medicine.medicine.Entity.OrderSupplier;
import com.medicine.medicine.Repository.OrderSupplierRepository;
import com.medicine.medicine.Service.OrderSupplierService;
import com.medicine.medicine.UtilityClass.RandomIdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderSupplierServiceImpl implements OrderSupplierService {
    @Autowired
    private OrderSupplierRepository orderSupplierRepository;

    @Override
    public List<OrderSupplier> getAllOrderSuppliers() {
        return orderSupplierRepository.findAll();
    }

    @Override
    public OrderSupplier getOrderSupplierById(String id) {
        Optional<OrderSupplier> orderSupplierOptional = orderSupplierRepository.findById(id);
        return orderSupplierOptional.orElseThrow(() -> new IllegalArgumentException("OrderSupplier not found"));
    }

    @Override
    public OrderSupplier addOrderSupplier(OrderSupplier orderSupplier) {
        orderSupplier.setId(RandomIdGenerator.generateRandomId());
        orderSupplier.setOrderDate(LocalDateTime.now());
        orderSupplier.setUpdateDate(LocalDateTime.now());
        return orderSupplierRepository.save(orderSupplier);
    }

    @Override
    public OrderSupplier updateOrderSupplier(OrderSupplier orderSupplier) {
        validateOrderSupplierExists(orderSupplier.getId());
        orderSupplier.setUpdateDate(LocalDateTime.now());
        return orderSupplierRepository.save(orderSupplier);
    }

    @Override
    public void deleteOrderSupplier(String id) {
        validateOrderSupplierExists(id);
        orderSupplierRepository.deleteById(id);
    }

    private void validateOrderSupplierExists(String orderSupplierId) {
        if (!orderSupplierRepository.existsById(orderSupplierId)) {
            throw new IllegalArgumentException("OrderSupplier not found");
        }
    }
}
