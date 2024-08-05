package com.medicine.medicine.Controller;

import com.medicine.medicine.Entity.*;
import com.medicine.medicine.Service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/medicine")
public class MedicineController {

    @Value("${images.directory}")
    private String imagesDirectory;

    @Autowired
    private MedicineService medicineService;

    @GetMapping
    public ResponseEntity<List<Medicine>> getAllMedicines() {
        List<Medicine> medicines = medicineService.getAllMedicines();

        return new ResponseEntity<>(medicines, HttpStatus.OK);
    }

    @GetMapping("/status/{status}")
    public List<Medicine> getMedicinesByStatus(@PathVariable String status) {
        return medicineService.getMedicinesByStatus(status);
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

    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            // Get the file name and create the path
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            Path path = Paths.get(imagesDirectory + fileName);

            // Save the file to the specified path
            Files.copy(file.getInputStream(), path);

            return new ResponseEntity<>("Image uploaded successfully: " + fileName, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("Image upload failed: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<String> addMedicine(@RequestBody Medicine medicine) {
        try {
            Medicine createdMedicine = medicineService.addMedicine(medicine);
            return new ResponseEntity<>(createdMedicine.getId(), HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity<String> updateMedicine(@RequestBody Medicine medicine) {
        try {
//            System.out.println(medicine.getId());
//            System.out.println(medicine.getImage());
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