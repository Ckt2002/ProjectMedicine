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
@Table(name = "order_user")
public class Order {
    @Id
    @Column(name = "id", length = 10)
    private String id;

    @Column(name = "total_price")
    private Double totalPrice;

    @Column(name = "order_date")
    private LocalDateTime orderDate;

    @Column(name = "updated_date")
    private LocalDateTime updatedDate;

    @Column(name = "status", length = 10)
    private String status;

    @ManyToOne
    @JoinColumn(name = "id_account_user")
    private Account accountUser;
}
