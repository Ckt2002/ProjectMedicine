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
@Table(name = "medicine")
public class Medicine {
    @Id
    @Column(name = "id", length = 10)
    private String id;

    @Column(name = "image")
    private String image;

    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price", nullable = false)
    private Double price;

    @ManyToOne
    @JoinColumn(name = "id_manufacturer", nullable = false)
    private Manufacturer manufacturer;

    @ManyToOne
    @JoinColumn(name = "id_dosage_form", nullable = false)
    private DosageForm dosageForm;

    @ManyToOne
    @JoinColumn(name = "id_brand", nullable = false)
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "id_medicine_type", nullable = false)
    private MedicineType medicineType;

    @Column(name = "status", nullable = false, length = 10)
    private String status;
}