package com.medicine.medicine.Service.impl;

import com.medicine.medicine.Entity.Ingredient;
import com.medicine.medicine.Repository.IngredientRepository;
import com.medicine.medicine.Service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientServiceImpl implements IngredientService {

    @Autowired
    private IngredientRepository ingredientRepository;

    @Override
    public List<Ingredient> getAllIngredients() {
        return ingredientRepository.findAll();
    }

    @Override
    public Ingredient getIngredientById(Long id) {
        return ingredientRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Ingredient not found"));
    }

    @Override
    public Ingredient getIngredientByName(String name) {
        return ingredientRepository.findByName(name).orElseThrow(() -> new IllegalArgumentException("Ingredient not found"));
    }

    @Override
    public Ingredient addIngredient(Ingredient Ingredient) {
        if (ingredientRepository.findByName(Ingredient.getName()).isPresent()) {
            throw new IllegalArgumentException("Ingredient name already exists");
        }
        return ingredientRepository.save(Ingredient);
    }

    @Override
    public Ingredient updateIngredient(Ingredient ingredient) {
        validateIngredientExists(ingredient.getId());
        if (ingredientRepository.findByName(ingredient.getName()).isPresent()
         && !ingredient.getId().equals(ingredientRepository.findByName(ingredient.getName()).get().getId())) {
            throw new IllegalArgumentException("ingredient name already exists");
        }
        return ingredientRepository.save(ingredient);
    }

    @Override
    public void deleteIngredient(Long id) {
        validateIngredientExists(id);
        ingredientRepository.deleteById(id);
    }

    private void validateIngredientExists(Long id) {
        if (!ingredientRepository.existsById(id)) {
            throw new IllegalArgumentException("Ingredient not found");
        }
    }
}
