package com.medicine.medicine.Controller;

import com.medicine.medicine.Entity.MedicineType;
import com.medicine.medicine.Service.MedicineTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicine_type")
public class MedicineTypeController {
    @Autowired
    private MedicineTypeService medicineTypeService;

    @GetMapping
    public ResponseEntity<List<MedicineType>> getAllMedicineTypes() {
        List<MedicineType> medicineTypes = medicineTypeService.getAllMedicineTypes();
        return new ResponseEntity<>(medicineTypes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicineType> getMedicineTypeById(@PathVariable Long id) {
        try {
            MedicineType MedicineType = medicineTypeService.getMedicineTypeById(id);
            return new ResponseEntity<>(MedicineType, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<MedicineType> getMedicineTypeByName(@PathVariable String name) {
        try {
            MedicineType MedicineType = medicineTypeService.getMedicineTypeByName(name);
            return new ResponseEntity<>(MedicineType, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<String> addMedicineType(@RequestBody MedicineType MedicineType) {
        try {
            MedicineType createdMedicineType = medicineTypeService.addMedicineType(MedicineType);
            return new ResponseEntity<>("MedicineType created successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity<String> updateMedicineType(@RequestBody MedicineType MedicineType) {
        try {
            MedicineType updatedMedicineType = medicineTypeService.updateMedicineType(MedicineType);
            return new ResponseEntity<>("MedicineType updated successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMedicineType(@PathVariable Long id) {
        try {
            medicineTypeService.deleteMedicineType(id);
            return new ResponseEntity<>("MedicineType deleted successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
