package com.medicine.medicine.Controller;

import com.medicine.medicine.Entity.EffectMedicine;
import com.medicine.medicine.Entity.EffectMedicinePK;
import com.medicine.medicine.Service.EffectMedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/effect-medicine")
public class EffectMedicineController {
    @Autowired
    private EffectMedicineService effectMedicineService;

    @GetMapping
    public List<EffectMedicine> getAllEffectMedicines() {
        return effectMedicineService.getAllEffectMedicines();
    }

    @GetMapping("/{effectId}/{medicineId}")
    public ResponseEntity<EffectMedicine> getEffectMedicineById(@PathVariable Long effectId, @PathVariable String medicineId) {
        EffectMedicinePK id = new EffectMedicinePK(effectId, medicineId);
        EffectMedicine effectMedicine = effectMedicineService.getEffectMedicineById(id);
        return ResponseEntity.ok(effectMedicine);
    }

    @GetMapping("/medicine/{medicineId}")
    public List<EffectMedicine> findByMedicineId(@PathVariable String medicineId) {
        return effectMedicineService.findByMedicineId(medicineId);
    }

    @PostMapping
    public ResponseEntity<String> createEffectMedicine(@RequestBody EffectMedicine effectMedicine) {
        try {
            EffectMedicine newEffectMedicine = effectMedicineService.createEffectMedicine(effectMedicine);
            return new ResponseEntity<>("Effect medicine created successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{effectId}/{medicineId}")
    public ResponseEntity<EffectMedicine> updateEffectMedicine(@PathVariable Long effectId, @PathVariable String medicineId, @RequestBody EffectMedicine effectMedicineDetails) {
        EffectMedicinePK id = new EffectMedicinePK(effectId, medicineId);
        EffectMedicine updatedEffectMedicine = effectMedicineService.updateEffectMedicine(id, effectMedicineDetails);
        return ResponseEntity.ok(updatedEffectMedicine);
    }

    @DeleteMapping("/{effectId}/{medicineId}")
    public ResponseEntity<Void> deleteEffectMedicine(@PathVariable Long effectId, @PathVariable String medicineId) {
        EffectMedicinePK id = new EffectMedicinePK(effectId, medicineId);
        effectMedicineService.deleteEffectMedicine(id);
        return ResponseEntity.noContent().build();
    }
}
