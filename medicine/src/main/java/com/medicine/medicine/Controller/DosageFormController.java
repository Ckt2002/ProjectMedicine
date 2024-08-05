package com.medicine.medicine.Controller;

import com.medicine.medicine.Entity.DosageForm;
import com.medicine.medicine.Service.DosageFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dosage_form")
public class DosageFormController {
    @Autowired
    private DosageFormService dosageFormService;

    @GetMapping
    public ResponseEntity<List<DosageForm>> getAllDosageForms() {
        List<DosageForm> DosageForms = dosageFormService.getAllDosageForms();
        return new ResponseEntity<>(DosageForms, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DosageForm> getDosageFormById(@PathVariable Long id) {
        try {
            DosageForm DosageForm = dosageFormService.getDosageFormById(id);
            return new ResponseEntity<>(DosageForm, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<DosageForm> getDosageFormByName(@PathVariable String name) {
        try {
            DosageForm DosageForm = dosageFormService.getDosageFormByName(name);
            return new ResponseEntity<>(DosageForm, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<String> addDosageForm(@RequestBody DosageForm DosageForm) {
        try {
            DosageForm createdDosageForm = dosageFormService.addDosageForm(DosageForm);
            return new ResponseEntity<>("DosageForm created successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity<String> updateDosageForm(@RequestBody DosageForm DosageForm) {
        try {
            DosageForm updatedDosageForm = dosageFormService.updateDosageForm(DosageForm);
            return new ResponseEntity<>("Dosage form updated successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>("Dosage form is currently being used and cannot be deleted.", HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDosageForm(@PathVariable Long id) {
        try {
            dosageFormService.deleteDosageForm(id);
            return new ResponseEntity<>("DosageForm deleted successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
