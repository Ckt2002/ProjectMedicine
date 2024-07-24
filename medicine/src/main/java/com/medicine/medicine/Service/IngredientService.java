package com.medicine.medicine.Service;

import com.medicine.medicine.Entity.Ingredient;

import java.util.List;

public interface IngredientService {

    List<Ingredient> getAllIngredients();

    Ingredient getIngredientById(Long id);

    Ingredient getIngredientByName(String name);

    Ingredient addIngredient(Ingredient Ingredient);

    Ingredient updateIngredient(Ingredient Ingredient);

    void deleteIngredient(Long id);
}
