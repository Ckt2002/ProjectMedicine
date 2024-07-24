package com.medicine.medicine.Controller;

import com.medicine.medicine.Entity.DetailImportSupplier;
import com.medicine.medicine.Entity.DetailImportSupplierPK;
import com.medicine.medicine.Service.DetailImportSupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/detail-import-supplier")
public class DetailImportSupplierController {

    @Autowired
    private DetailImportSupplierService detailImportSupplierService;

    @GetMapping
    public ResponseEntity<List<DetailImportSupplier>> getAllDetailImportSuppliers() {
        List<DetailImportSupplier> detailImportSuppliers = detailImportSupplierService.getAllDetailImportSuppliers();
        return new ResponseEntity<>(detailImportSuppliers, HttpStatus.OK);
    }

    @GetMapping("/{importSupplierId}/{medicineId}")
    public ResponseEntity<DetailImportSupplier> getDetailImportSupplierById(@PathVariable String importSupplierId, @PathVariable String medicineId) {
        DetailImportSupplierPK id = new DetailImportSupplierPK(importSupplierId, medicineId);
        try {
            DetailImportSupplier detailImportSupplier = detailImportSupplierService.getDetailImportSupplierById(id);
            return new ResponseEntity<>(detailImportSupplier, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<String> addDetailImportSupplier(@RequestBody DetailImportSupplier detailImportSupplier) {
        try {
            DetailImportSupplier createdDetailImportSupplier = detailImportSupplierService.addDetailImportSupplier(detailImportSupplier);
            return new ResponseEntity<>("DetailImportSupplier created successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{importSupplierId}/{medicineId}")
    public ResponseEntity<String> updateDetailImportSupplier(@PathVariable String importSupplierId, @PathVariable String medicineId, @RequestBody DetailImportSupplier detailImportSupplier) {
        try {
            detailImportSupplier.getId().setImportSupplierId(importSupplierId);
            detailImportSupplier.getId().setMedicineId(medicineId);
            DetailImportSupplier updatedDetailImportSupplier = detailImportSupplierService.updateDetailImportSupplier(detailImportSupplier);
            return new ResponseEntity<>("DetailImportSupplier updated successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{importSupplierId}/{medicineId}")
    public ResponseEntity<String> deleteDetailImportSupplier(@PathVariable String importSupplierId, @PathVariable String medicineId) {
        DetailImportSupplierPK id = new DetailImportSupplierPK(importSupplierId, medicineId);
        try {
            detailImportSupplierService.deleteDetailImportSupplier(id);
            return new ResponseEntity<>("DetailImportSupplier deleted successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
