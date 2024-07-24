package com.medicine.medicine.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ingredient_medicine")
public class IngredientMedicine {

    @EmbeddedId
    private IngredientMedicinePK id;

    @ManyToOne
    @MapsId("idMedicine")
    @JoinColumn(name = "id_medicine", nullable = false, columnDefinition = "VARCHAR(10)")
    private Medicine medicine;

    @ManyToOne
    @MapsId("idIngredient")
    @JoinColumn(name = "id_ingredient", nullable = false)
    private Ingredient ingredient;
}