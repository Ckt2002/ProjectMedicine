package com.medicine.medicine.Controller;

import com.medicine.medicine.Entity.Contraindicated;
import com.medicine.medicine.Service.ContraindicatedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contraindicated")
public class ContraindicatedController {
    @Autowired
    private ContraindicatedService contraindicatedService;

    @GetMapping
    public List<Contraindicated> getAllContraindications() {
        return contraindicatedService.getAllContraindications();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contraindicated> getContraindicationById(@PathVariable Long id) {
        Contraindicated contraindication = contraindicatedService.getContraindicationById(id);
        return ResponseEntity.ok(contraindication);
    }

    @PostMapping
    public ResponseEntity<Contraindicated> createContraindication(@RequestBody Contraindicated contraindication) {
        Contraindicated newContraindication = contraindicatedService.createContraindication(contraindication);
        return ResponseEntity.ok(newContraindication);
    }

    @PutMapping
    public ResponseEntity<Contraindicated> updateContraindication(@RequestBody Contraindicated contraindicationDetails) {
        Contraindicated updatedContraindication = contraindicatedService.updateContraindication(contraindicationDetails);
        return ResponseEntity.ok(updatedContraindication);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContraindication(@PathVariable Long id) {
        contraindicatedService.deleteContraindication(id);
        return ResponseEntity.noContent().build();
    }
}
