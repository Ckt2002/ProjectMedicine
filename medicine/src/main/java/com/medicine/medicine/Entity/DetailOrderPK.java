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
public class DetailOrderPK implements Serializable {

    @Column(name = "id_order", length = 10)
    private String idOrder;

    @Column(name = "id_seri", length = 10)
    private String idSeri;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DetailOrderPK that = (DetailOrderPK) o;

        if (!idOrder.equals(that.idOrder)) return false;
        return idSeri.equals(that.idSeri);
    }

    @Override
    public int hashCode() {
        int result = idOrder.hashCode();
        result = 31 * result + idSeri.hashCode();
        return result;
    }
}