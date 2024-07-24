package com.medicine.medicine.Entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "detail_import_supplier")
public class DetailImportSupplier {

    @EmbeddedId
    private DetailImportSupplierPK id;

    @ManyToOne
    @MapsId("importSupplierId")
    @JoinColumn(name = "id_import_supplier", nullable = false, columnDefinition = "VARCHAR(10)")
    private ImportSupplier importSupplier;

    @ManyToOne
    @MapsId("medicineId")
    @JoinColumn(name = "id_medicine", nullable = false, columnDefinition = "VARCHAR(10)")
    private Medicine medicine;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;
}
