package com.medicine.medicine.Controller;

import com.medicine.medicine.Entity.IngredientMedicine;
import com.medicine.medicine.Entity.IngredientMedicinePK;
import com.medicine.medicine.Service.IngredientMedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ingredient_medicine")
public class IngredientMedicineController {

    @Autowired
    private IngredientMedicineService ingredientMedicineService;

    @GetMapping
    public ResponseEntity<List<IngredientMedicine>> getAllIngredientMedicines() {
        List<IngredientMedicine> ingredientMedicines = ingredientMedicineService.getAllIngredientMedicines();
        return new ResponseEntity<>(ingredientMedicines, HttpStatus.OK);
    }

    @GetMapping("/{idMedicine}/{idIngredient}")
    public ResponseEntity<IngredientMedicine> getIngredientMedicineById(@PathVariable String idMedicine, @PathVariable Long idIngredient) {
        IngredientMedicinePK id = new IngredientMedicinePK(idMedicine, idIngredient);
        try {
            IngredientMedicine ingredientMedicine = ingredientMedicineService.getIngredientMedicineById(id);
            return new ResponseEntity<>(ingredientMedicine, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/medicine/{idMedicine}")
    public List<IngredientMedicine> getIngredientMedicinesByIdMedicine(@PathVariable String idMedicine) {
        return ingredientMedicineService.findByIdMedicine(idMedicine);
    }

    @GetMapping("/ingredient/{idIngredient}")
    public List<IngredientMedicine> getIngredientMedicinesByIdIngredient(@PathVariable Long idIngredient) {
        return ingredientMedicineService.findByIdIngredient(idIngredient);
    }

    @PostMapping
    public ResponseEntity<String> addIngredientMedicine(@RequestBody IngredientMedicine ingredientMedicine) {
        try {
            IngredientMedicine createdIngredientMedicine = ingredientMedicineService.addIngredientMedicine(ingredientMedicine);
            return new ResponseEntity<>("IngredientMedicine created successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{idMedicine}/{idIngredient}")
    public ResponseEntity<String> updateIngredientMedicine(@PathVariable String idMedicine, @PathVariable Long idIngredient, @RequestBody IngredientMedicine ingredientMedicine) {
        try {
            ingredientMedicine.getId().setIdMedicine(idMedicine);
            ingredientMedicine.getId().setIdIngredient(idIngredient);
            IngredientMedicine updatedIngredientMedicine = ingredientMedicineService.updateIngredientMedicine(ingredientMedicine);
            return new ResponseEntity<>("IngredientMedicine updated successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{idMedicine}/{idIngredient}")
    public ResponseEntity<String> deleteIngredientMedicine(@PathVariable String idMedicine, @PathVariable Long idIngredient) {
        IngredientMedicinePK id = new IngredientMedicinePK(idMedicine, idIngredient);
        try {
            ingredientMedicineService.deleteIngredientMedicine(id);
            return new ResponseEntity<>("IngredientMedicine deleted successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/searchByIngredient/{ingredient}")
    public ResponseEntity<List<IngredientMedicine>> searchByIngredient(@PathVariable String ingredient) {
        try {
            List<IngredientMedicine> medicines = ingredientMedicineService.searchMedicinesByIngredientName(ingredient);
            return new ResponseEntity<>(medicines, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
