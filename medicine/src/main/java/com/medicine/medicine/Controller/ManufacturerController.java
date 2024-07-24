package com.medicine.medicine.Controller;

import com.medicine.medicine.Entity.Manufacturer;
import com.medicine.medicine.Service.ManufacturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manufacturer")
public class ManufacturerController {
    @Autowired
    private ManufacturerService manufacturerService;

    @GetMapping
    public ResponseEntity<List<Manufacturer>> getAllManufacturers() {
        List<Manufacturer> manufacturers = manufacturerService.getAllManufacturers();
        return new ResponseEntity<>(manufacturers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Manufacturer> getManufacturerById(@PathVariable Long id) {
        try {
            Manufacturer manufacturer = manufacturerService.getManufacturerById(id);
            return new ResponseEntity<>(manufacturer, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Manufacturer> getManufacturerByName(@PathVariable String name) {
        try {
            Manufacturer manufacturer = manufacturerService.getManufacturerByName(name);
            return new ResponseEntity<>(manufacturer, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<String> addManufacturer(@RequestBody Manufacturer manufacturer) {
        try {
            Manufacturer createdManufacturer = manufacturerService.addManufacturer(manufacturer);
            return new ResponseEntity<>("Manufacturer created successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateManufacturer(@PathVariable Long id, @RequestBody Manufacturer manufacturer) {
        try {
            manufacturer.setId(id);
            Manufacturer updatedManufacturer = manufacturerService.updateManufacturer(manufacturer);
            return new ResponseEntity<>("Manufacturer updated successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteManufacturer(@PathVariable Long id) {
        try {
            manufacturerService.deleteManufacturer(id);
            return new ResponseEntity<>("Manufacturer deleted successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
