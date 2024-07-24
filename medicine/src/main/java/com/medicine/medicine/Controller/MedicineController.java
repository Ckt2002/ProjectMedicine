package com.medicine.medicine.Controller;

import com.medicine.medicine.Entity.*;
import com.medicine.medicine.Service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicine")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @GetMapping
    public ResponseEntity<List<Medicine>> getAllMedicines() {
        List<Medicine> medicines = medicineService.getAllMedicines();
        return new ResponseEntity<>(medicines, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medicine> getMedicineById(@PathVariable String id) {
        try {
            Medicine medicine = medicineService.getMedicineById(id);
            return new ResponseEntity<>(medicine, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Medicine> getMedicineByName(@PathVariable String name) {
        try {
            Medicine medicine = medicineService.getMedicineByName(name);
            return new ResponseEntity<>(medicine, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/brand/{brandId}")
    public ResponseEntity<List<Medicine>> getMedicinesByBrand(@PathVariable Long brandId) {
        try {
            Brand brand = new Brand();
            brand.setId(brandId);
            List<Medicine> medicines = medicineService.getMedicinesByBrand(brand);
            return new ResponseEntity<>(medicines, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/MedicineType/{MedicineTypeId}")
    public ResponseEntity<List<Medicine>> getMedicinesByMedicineType(@PathVariable Long MedicineTypeId) {
        try {
            MedicineType medicineType = new MedicineType();
            medicineType.setId(MedicineTypeId);
            List<Medicine> medicines = medicineService.getMedicinesByType(medicineType);
            return new ResponseEntity<>(medicines, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/dosageForm/{dosageFormId}")
    public ResponseEntity<List<Medicine>> getMedicinesByDosageForm(@PathVariable Long dosageFormId) {
        try {
            DosageForm dosageForm = new DosageForm();
            dosageForm.setId(dosageFormId);
            List<Medicine> medicines = medicineService.getMedicinesByDosageForm(dosageForm);
            return new ResponseEntity<>(medicines, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/manufacturer/{manufacturerId}")
    public ResponseEntity<List<Medicine>> getMedicinesByManufacturer(@PathVariable Long manufacturerId) {
        try {
            Manufacturer manufacturer = new Manufacturer();
            manufacturer.setId(manufacturerId);
            List<Medicine> medicines = medicineService.getMedicinesByManufacturer(manufacturer);
            return new ResponseEntity<>(medicines, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<String> addMedicine(@RequestBody Medicine medicine) {
        try {
            Medicine createdMedicine = medicineService.addMedicine(medicine);
            return new ResponseEntity<>("Medicine created successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateMedicine(@PathVariable String id, @RequestBody Medicine medicine) {
        try {
            medicine.setId(id);
            Medicine updatedMedicine = medicineService.updateMedicine(medicine);
            return new ResponseEntity<>("Medicine updated successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMedicine(@PathVariable String id) {
        try {
            medicineService.deleteMedicine(id);
            return new ResponseEntity<>("Medicine deleted successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}