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
@Table(name = "seri")
public class Seri {
    @Id
    @Column(name = "id", length = 10)
    private String id;

    @Column(name = "status", nullable = false, length = 10)
    private String status;

    @ManyToOne
    @JoinColumn(name = "id_medicine", nullable = false)
    private Medicine medicine;
}
