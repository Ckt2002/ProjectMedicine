package com.medicine.medicine.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "detail_discount")
public class DetailDiscount {

    @EmbeddedId
    private DetailDiscountPK id;

    @ManyToOne
    @MapsId("discountId")
    @JoinColumn(name = "id_discount", nullable = false)
    private Discount discount;

    @ManyToOne
    @MapsId("medicineId")
    @JoinColumn(name = "id_medicine", nullable = false, columnDefinition = "VARCHAR(10)")
    private Medicine medicine;

    @Column(name = "from_date", nullable = false)
    private LocalDate fromDate;

    @Column(name = "to_date", nullable = false)
    private LocalDate toDate;
}
