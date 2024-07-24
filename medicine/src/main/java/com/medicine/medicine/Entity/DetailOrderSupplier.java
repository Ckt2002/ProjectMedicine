package com.medicine.medicine.Entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "detail_order_supplier")
public class DetailOrderSupplier {

    @EmbeddedId
    private DetailOrderSupplierPK id;

    @ManyToOne
    @MapsId("orderSupplierId")
    @JoinColumn(name = "id_order_supplier", nullable = false, columnDefinition = "VARCHAR(10)")
    private OrderSupplier orderSupplier;

    @ManyToOne
    @MapsId("medicineId")
    @JoinColumn(name = "id_medicine", nullable = false, columnDefinition = "VARCHAR(10)")
    private Medicine medicine;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;
}