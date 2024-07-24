package com.medicine.medicine.Controller;

import com.medicine.medicine.Entity.DetailOrderSupplier;
import com.medicine.medicine.Entity.DetailOrderSupplierPK;
import com.medicine.medicine.Service.DetailOrderSupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/detail-order-supplier")
public class DetailOrderSupplierController {

    @Autowired
    private DetailOrderSupplierService detailOrderSupplierService;

    @GetMapping
    public ResponseEntity<List<DetailOrderSupplier>> getAllDetailOrderSuppliers() {
        List<DetailOrderSupplier> detailOrderSuppliers = detailOrderSupplierService.getAllDetailOrderSuppliers();
        return new ResponseEntity<>(detailOrderSuppliers, HttpStatus.OK);
    }

    @GetMapping("/{orderSupplierId}/{medicineId}")
    public ResponseEntity<DetailOrderSupplier> getDetailOrderSupplierById(@PathVariable String orderSupplierId, @PathVariable String medicineId) {
        DetailOrderSupplierPK id = new DetailOrderSupplierPK(orderSupplierId, medicineId);
        try {
            DetailOrderSupplier detailOrderSupplier = detailOrderSupplierService.getDetailOrderSupplierById(id);
            return new ResponseEntity<>(detailOrderSupplier, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<String> addDetailOrderSupplier(@RequestBody DetailOrderSupplier detailOrderSupplier) {
        try {
            DetailOrderSupplier createdDetailOrderSupplier = detailOrderSupplierService.addDetailOrderSupplier(detailOrderSupplier);
            return new ResponseEntity<>("DetailOrderSupplier created successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{orderSupplierId}/{medicineId}")
    public ResponseEntity<String> updateDetailOrderSupplier(@PathVariable String orderSupplierId, @PathVariable String medicineId, @RequestBody DetailOrderSupplier detailOrderSupplier) {
        try {
            detailOrderSupplier.getId().setOrderSupplierId(orderSupplierId);
            detailOrderSupplier.getId().setMedicineId(medicineId);
            DetailOrderSupplier updatedDetailOrderSupplier = detailOrderSupplierService.updateDetailOrderSupplier(detailOrderSupplier);
            return new ResponseEntity<>("DetailOrderSupplier updated successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{orderSupplierId}/{medicineId}")
    public ResponseEntity<String> deleteDetailOrderSupplier(@PathVariable String orderSupplierId, @PathVariable String medicineId) {
        DetailOrderSupplierPK id = new DetailOrderSupplierPK(orderSupplierId, medicineId);
        try {
            detailOrderSupplierService.deleteDetailOrderSupplier(id);
            return new ResponseEntity<>("DetailOrderSupplier deleted successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}