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
@Table(name = "order_supplier")
public class OrderSupplier {
    @Id
    @Column(name = "id", length = 10)
    private String id;

    @Column(name = "order_date")
    private LocalDateTime orderDate;

    @Column(name = "update_date")
    private LocalDateTime updateDate;

    @Column(name = "status", length = 10)
    private String status;

    @ManyToOne
    @JoinColumn(name = "id_account_admin")
    private Account accountAdmin;

    @ManyToOne
    @JoinColumn(name = "id_supplier")
    private Supplier supplier;
}
