package com.medicine.medicine.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "detail_order")
public class DetailOrder {
    @EmbeddedId
    private DetailOrderPK id;

    @ManyToOne
    @MapsId("idOrder")
    @JoinColumn(name = "id_order", nullable = false, columnDefinition = "VARCHAR(10)")
    private Order order;

    @ManyToOne
    @MapsId("idSeri")
    @JoinColumn(name = "id_seri", nullable = false, columnDefinition = "VARCHAR(10)")
    private Seri seri;

    @Column(name = "price", nullable = false)
    private Double price;
}
