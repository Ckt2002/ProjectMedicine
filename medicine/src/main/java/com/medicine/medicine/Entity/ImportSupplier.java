package com.medicine.medicine.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "import_supplier")
public class ImportSupplier {
    @Id
    @Column(name = "id", length = 10)
    private String id;

    @Column(name = "total_price")
    private Double totalPrice;

    @Column(name = "import_date")
    private LocalDateTime importDate;

    @ManyToOne
    @JoinColumn(name = "id_order_supplier")
    private OrderSupplier order;

    @ManyToOne
    @JoinColumn(name = "id_account_admin")
    private Account accountAdmin;
}
