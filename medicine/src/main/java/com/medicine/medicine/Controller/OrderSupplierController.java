package com.medicine.medicine.Controller;

import com.medicine.medicine.Entity.OrderSupplier;
import com.medicine.medicine.Service.OrderSupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order_supplier")
public class OrderSupplierController {
    @Autowired
    private OrderSupplierService orderSupplierService;

    @GetMapping
    public ResponseEntity<List<OrderSupplier>> getAllOrderSuppliers() {
        List<OrderSupplier> orderSuppliers = orderSupplierService.getAllOrderSuppliers();
        return ResponseEntity.ok(orderSuppliers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderSupplier> getOrderSupplierById(@PathVariable String id) {
        try {
            OrderSupplier orderSupplier = orderSupplierService.getOrderSupplierById(id);
            return ResponseEntity.ok(orderSupplier);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<String> addOrderSupplier(@RequestBody OrderSupplier orderSupplier) {
        try {
            OrderSupplier newOrderSupplier = orderSupplierService.addOrderSupplier(orderSupplier);
            return new ResponseEntity<>("OrderSupplier added successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity<String> updateOrderSupplier(@RequestBody OrderSupplier orderSupplier) {
        try {
            OrderSupplier updatedOrderSupplier = orderSupplierService.updateOrderSupplier(orderSupplier);
            return ResponseEntity.ok("OrderSupplier updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrderSupplier(@PathVariable String id) {
        try {
            orderSupplierService.deleteOrderSupplier(id);
            return ResponseEntity.ok("OrderSupplier deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
