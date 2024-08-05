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
public class EffectMedicinePK implements Serializable {
    @Column(name = "id_effect")
    private Long effectId;

    @Column(name = "id_medicine", length = 10)
    private String medicineId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        EffectMedicinePK that = (EffectMedicinePK) o;

        if (!effectId.equals(that.effectId)) return false;
        return medicineId.equals(that.medicineId);
    }

    @Override
    public int hashCode() {
        int result = effectId.hashCode();
        result = 31 * result + medicineId.hashCode();
        return result;
    }
}
