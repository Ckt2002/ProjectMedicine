package com.medicine.medicine.Controller;

import com.medicine.medicine.Entity.ContraindicatedMedicine;
import com.medicine.medicine.Entity.ContraindicatedMedicinePK;
import com.medicine.medicine.Service.ContraindicatedMedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contraindicated_medicine")
public class ContraindicatedMedicineController {
    @Autowired
    private ContraindicatedMedicineService contraindicatedMedicineService;

    @GetMapping
    public List<ContraindicatedMedicine> getAllContraindicatedMedicines() {
        return contraindicatedMedicineService.getAllContraindicatedMedicines();
    }

    @GetMapping("/{medicineId}")
    public List<ContraindicatedMedicine> getContraindicatedMedicinesByMedicineId(@PathVariable String medicineId) {
        return contraindicatedMedicineService.getContraindicatedMedicinesByMedicineId(medicineId);
    }

    @GetMapping("/id")
    public ResponseEntity<ContraindicatedMedicine> getContraindicatedMedicineById(@RequestBody ContraindicatedMedicinePK id) {
        ContraindicatedMedicine contraindicatedMedicine = contraindicatedMedicineService.getContraindicatedMedicineById(id);
        return ResponseEntity.ok(contraindicatedMedicine);
    }

    @PostMapping
    public ResponseEntity<String> createContraindicatedMedicine(@RequestBody ContraindicatedMedicine contraindicatedMedicine) {
        try {
            ContraindicatedMedicine newContraindicatedMedicine = contraindicatedMedicineService.createContraindicatedMedicine(contraindicatedMedicine);
            return new ResponseEntity<>("Contraindication medicine created successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping
    public ResponseEntity<ContraindicatedMedicine> updateContraindicatedMedicine(@RequestBody ContraindicatedMedicinePK id, @RequestBody ContraindicatedMedicine contraindicatedMedicineDetails) {
        ContraindicatedMedicine updatedContraindicatedMedicine = contraindicatedMedicineService.updateContraindicatedMedicine(id, contraindicatedMedicineDetails);
        return ResponseEntity.ok(updatedContraindicatedMedicine);
    }

    @DeleteMapping("/{medicineId}/{contraindicatedId}")
    public ResponseEntity<String> deleteContraindicatedMedicine(@PathVariable String medicineId,
                                                                @PathVariable Long contraindicatedId) {
        try {
            ContraindicatedMedicinePK id = new ContraindicatedMedicinePK(contraindicatedId, medicineId);
            contraindicatedMedicineService.deleteContraindicatedMedicine(id);
            return new ResponseEntity<>("Contraindication deleted successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
