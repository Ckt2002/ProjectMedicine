package com.medicine.medicine.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class DetailDiscountPK implements Serializable {

    @Column(name = "id_discount")
    private Long discountId;

    @Column(name = "id_medicine", length = 10)
    private String medicineId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DetailDiscountPK that = (DetailDiscountPK) o;

        if (!discountId.equals(that.discountId)) return false;
        return medicineId.equals(that.medicineId);
    }

    @Override
    public int hashCode() {
        int result = discountId.hashCode();
        result = 31 * result + medicineId.hashCode();
        return result;
    }
}