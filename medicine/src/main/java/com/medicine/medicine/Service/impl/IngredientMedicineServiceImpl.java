package com.medicine.medicine.Service.impl;

import com.medicine.medicine.Entity.IngredientMedicine;
import com.medicine.medicine.Entity.IngredientMedicinePK;
import com.medicine.medicine.Repository.IngredientMedicineRepository;
import com.medicine.medicine.Service.IngredientMedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientMedicineServiceImpl implements IngredientMedicineService {

    @Autowired
    private IngredientMedicineRepository ingredientMedicineRepository;

    @Override
    public List<IngredientMedicine> getAllIngredientMedicines() {
        return ingredientMedicineRepository.findAll();
    }

    @Override
    public IngredientMedicine getIngredientMedicineById(IngredientMedicinePK id) {
        return ingredientMedicineRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("IngredientMedicine not found"));
    }

    @Override
    public IngredientMedicine addIngredientMedicine(IngredientMedicine ingredientMedicine) {
        return ingredientMedicineRepository.save(ingredientMedicine);
    }

    @Override
    public IngredientMedicine updateIngredientMedicine(IngredientMedicine ingredientMedicine) {
        validateIngredientMedicineExists(ingredientMedicine.getId());
        return ingredientMedicineRepository.save(ingredientMedicine);
    }

    @Override
    public void deleteIngredientMedicine(IngredientMedicinePK id) {
        validateIngredientMedicineExists(id);
        ingredientMedicineRepository.deleteById(id);
    }

    @Override
    public List<IngredientMedicine> findByIdMedicine(String idMedicine) {
        return ingredientMedicineRepository.findByIdMedicine(idMedicine);
    }

    @Override
    public List<IngredientMedicine> findByIdIngredient(Long idIngredient) {
        return ingredientMedicineRepository.findByIdIngredient(idIngredient);
    }

    private void validateIngredientMedicineExists(IngredientMedicinePK id) {
        if (!ingredientMedicineRepository.existsById(id)) {
            throw new IllegalArgumentException("IngredientMedicine not found");
        }
    }
}
