package com.medicine.medicine.Controller;

import com.medicine.medicine.Entity.ImportSupplier;
import com.medicine.medicine.Service.ImportSupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/import_supplier")
public class ImportSupplierController {
    @Autowired
    private ImportSupplierService importSupplierService;

    @GetMapping
    public ResponseEntity<List<ImportSupplier>> getAllImportSuppliers() {
        List<ImportSupplier> importSuppliers = importSupplierService.getAllImportSuppliers();
        return ResponseEntity.ok(importSuppliers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ImportSupplier> getImportSupplierById(@PathVariable String id) {
        try {
            ImportSupplier importSupplier = importSupplierService.getImportSupplierById(id);
            return ResponseEntity.ok(importSupplier);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<String> addImportSupplier(@RequestBody ImportSupplier importSupplier) {
        try {
            ImportSupplier newImportSupplier = importSupplierService.addImportSupplier(importSupplier);
            return new ResponseEntity<>(newImportSupplier.getId(), HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity<String> updateImportSupplier(@RequestBody ImportSupplier importSupplier) {
        try {
            ImportSupplier updatedImportSupplier = importSupplierService.updateImportSupplier(importSupplier);
            return ResponseEntity.ok("ImportSupplier updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteImportSupplier(@PathVariable String id) {
        try {
            importSupplierService.deleteImportSupplier(id);
            return ResponseEntity.ok("ImportSupplier deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
