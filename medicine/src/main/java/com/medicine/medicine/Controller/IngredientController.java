package com.medicine.medicine.Controller;

import com.medicine.medicine.Entity.Ingredient;
import com.medicine.medicine.Service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ingredient")
public class IngredientController {
    @Autowired
    private IngredientService ingredientService;

    @GetMapping
    public ResponseEntity<List<Ingredient>> getAllIngredients() {
        List<Ingredient> Ingredients = ingredientService.getAllIngredients();
        return new ResponseEntity<>(Ingredients, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ingredient> getIngredientById(@PathVariable Long id) {
        try {
            Ingredient Ingredient = ingredientService.getIngredientById(id);
            return new ResponseEntity<>(Ingredient, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Ingredient> getIngredientByName(@PathVariable String name) {
        try {
            Ingredient Ingredient = ingredientService.getIngredientByName(name);
            return new ResponseEntity<>(Ingredient, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<String> addIngredient(@RequestBody Ingredient Ingredient) {
        try {
            Ingredient createdIngredient = ingredientService.addIngredient(Ingredient);
            return new ResponseEntity<>("Ingredient created successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateIngredient(@PathVariable Long id, @RequestBody Ingredient Ingredient) {
        try {
            Ingredient.setId(id);
            Ingredient updatedIngredient = ingredientService.updateIngredient(Ingredient);
            return new ResponseEntity<>("Ingredient updated successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteIngredient(@PathVariable Long id) {
        try {
            ingredientService.deleteIngredient(id);
            return new ResponseEntity<>("Ingredient deleted successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
