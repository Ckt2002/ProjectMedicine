package com.medicine.medicine.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class DetailOrderSupplierPK implements Serializable {

    @Column(name = "id_order_supplier", length = 10)
    private String orderSupplierId;

    @Column(name = "id_medicine", length = 10)
    private String medicineId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DetailOrderSupplierPK that = (DetailOrderSupplierPK) o;

        if (!orderSupplierId.equals(that.orderSupplierId)) return false;
        return medicineId.equals(that.medicineId);
    }

    @Override
    public int hashCode() {
        int result = orderSupplierId.hashCode();
        result = 31 * result + medicineId.hashCode();
        return result;
    }
}