package com.medicine.medicine.Service;

import com.medicine.medicine.Entity.IngredientMedicine;
import com.medicine.medicine.Entity.IngredientMedicinePK;

import java.util.List;

public interface IngredientMedicineService {
    List<IngredientMedicine> getAllIngredientMedicines();

    IngredientMedicine getIngredientMedicineById(IngredientMedicinePK id);

    IngredientMedicine addIngredientMedicine(IngredientMedicine ingredientMedicine);

    IngredientMedicine updateIngredientMedicine(IngredientMedicine ingredientMedicine);

    void deleteIngredientMedicine(IngredientMedicinePK id);

    List<IngredientMedicine> findByIdMedicine(String idMedicine);

    List<IngredientMedicine> findByIdIngredient(Long idIngredient);
}
