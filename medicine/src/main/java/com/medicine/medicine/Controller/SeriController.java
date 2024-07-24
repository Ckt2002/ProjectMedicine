package com.medicine.medicine.Controller;

import com.medicine.medicine.Entity.Seri;
import com.medicine.medicine.Service.SeriService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seri")
public class SeriController {

    @Autowired
    private SeriService seriService;

    @GetMapping
    public ResponseEntity<List<Seri>> getAllSeris() {
        List<Seri> seris = seriService.getAllSeris();
        return new ResponseEntity<>(seris, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seri> getSeriById(@PathVariable String id) {
        try {
            Seri seri = seriService.getSeriById(id);
            return new ResponseEntity<>(seri, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/count/{idMedicine}/{status}")
    public long countSeriByMedicineIdAndStatus(@PathVariable String idMedicine, @PathVariable String status) {
        return seriService.countSeriByMedicineIdAndStatus(idMedicine, status);
    }

    @PostMapping
    public ResponseEntity<String> addSeri(@RequestBody Seri seri) {
        try {
            Seri createdSeri = seriService.addSeri(seri);
            return new ResponseEntity<>("Seri created successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateSeri(@PathVariable String id, @RequestBody Seri seri) {
        try {
            seri.setId(id);
            Seri updatedSeri = seriService.updateSeri(seri);
            return new ResponseEntity<>("Seri updated successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSeri(@PathVariable String id) {
        try {
            seriService.deleteSeri(id);
            return new ResponseEntity<>("Seri deleted successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/Medicine/{medicineId}")
    public ResponseEntity<List<Seri>> getSerisByMedicineId(@PathVariable String medicineId) {
        List<Seri> seris = seriService.getSerisByMedicineId(medicineId);
        return new ResponseEntity<>(seris, HttpStatus.OK);
    }

    @GetMapping("/random-seri/{medicineId}")
    public Seri getRandomSeri(@PathVariable String medicineId) {
        return seriService.findRandomSeriByStatusAndMedicineId(medicineId);
    }
}
