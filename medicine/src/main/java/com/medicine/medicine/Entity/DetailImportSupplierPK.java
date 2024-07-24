package com.medicine.medicine.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class DetailImportSupplierPK implements Serializable {

    @Column(name = "id_import_supplier")
    private String importSupplierId;

    @Column(name = "id_medicine", length = 10)
    private String medicineId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DetailImportSupplierPK that = (DetailImportSupplierPK) o;

        if (!importSupplierId.equals(that.importSupplierId)) return false;
        return medicineId.equals(that.medicineId);
    }

    @Override
    public int hashCode() {
        int result = importSupplierId.hashCode();
        result = 31 * result + medicineId.hashCode();
        return result;
    }
}