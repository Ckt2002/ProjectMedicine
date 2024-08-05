package com.medicine.medicine.Controller;

import com.medicine.medicine.Entity.Brand;
import com.medicine.medicine.Service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brand")
public class BrandController {
    @Autowired
    private BrandService brandService;

    @GetMapping
    public ResponseEntity<List<Brand>> getAllBrands() {
        List<Brand> Brands = brandService.getAllBrands();
        return new ResponseEntity<>(Brands, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Brand> getBrandById(@PathVariable Long id) {
        try {
            Brand Brand = brandService.getBrandById(id);
            return new ResponseEntity<>(Brand, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Brand> getBrandByName(@PathVariable String name) {
        try {
            Brand Brand = brandService.getBrandByName(name);
            return new ResponseEntity<>(Brand, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<String> addBrand(@RequestBody Brand Brand) {
        try {
            Brand createdBrand = brandService.addBrand(Brand);
            return new ResponseEntity<>("Brand created successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity<String> updateBrand(@RequestBody Brand Brand) {
        try {
            Brand updatedBrand = brandService.updateBrand(Brand);
            return new ResponseEntity<>("Brand updated successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBrand(@PathVariable Long id) {
        try {
            brandService.deleteBrand(id);
            return new ResponseEntity<>("Brand deleted successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>("Brand is currently being used and cannot be deleted.", HttpStatus.CONFLICT);
        }
    }
}
