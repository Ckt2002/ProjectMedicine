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
public class ContraindicatedMedicinePK implements Serializable {
    @Column(name = "id_contraindicated")
    private Long contraindicatedId;

    @Column(name = "id_medicine", length = 10)
    private String medicineId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ContraindicatedMedicinePK that = (ContraindicatedMedicinePK) o;

        if (!contraindicatedId.equals(that.contraindicatedId)) return false;
        return medicineId.equals(that.medicineId);
    }

    @Override
    public int hashCode() {
        int result = contraindicatedId.hashCode();
        result = 31 * result + medicineId.hashCode();
        return result;
    }
}
