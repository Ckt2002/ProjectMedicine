package com.medicine.medicine.Repository;

import com.medicine.medicine.Entity.IngredientMedicine;
import com.medicine.medicine.Entity.IngredientMedicinePK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IngredientMedicineRepository extends JpaRepository<IngredientMedicine, IngredientMedicinePK> {
    @Query("SELECT id FROM IngredientMedicine id WHERE id.id.idMedicine = :idMedicine")
    List<IngredientMedicine> findByIdMedicine(@Param("idMedicine") String idMedicine);

    @Query("SELECT id FROM IngredientMedicine id WHERE id.id.idIngredient = :idIngredient")
    List<IngredientMedicine> findByIdIngredient(@Param("idIngredient") Long idIngredient);

    @Query("SELECT im FROM IngredientMedicine im JOIN im.ingredient i WHERE i.name = :ingredientName")
    List<IngredientMedicine> findByIngredientName(@Param("ingredientName") String ingredientName);

    boolean existsById(IngredientMedicinePK id);
}
