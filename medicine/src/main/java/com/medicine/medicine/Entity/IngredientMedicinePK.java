package com.medicine.medicine.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class IngredientMedicinePK implements Serializable {

    @Column(name = "id_medicine", columnDefinition = "VARCHAR(10)")
    private String idMedicine;

    @Column(name = "id_ingredient")
    private Long idIngredient;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        IngredientMedicinePK that = (IngredientMedicinePK) o;

        if (!idMedicine.equals(that.idMedicine)) return false;
        return idIngredient.equals(that.idIngredient);
    }

    @Override
    public int hashCode() {
        int result = idMedicine.hashCode();
        result = 31 * result + idIngredient.hashCode();
        return result;
    }
}