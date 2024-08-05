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
@Table(name = "contraindicated_medicine")
public class ContraindicatedMedicine {
    @EmbeddedId
    private ContraindicatedMedicinePK id;

    @ManyToOne
    @MapsId("contraindicatedId")
    @JoinColumn(name = "id_contraindicated", nullable = false)
    private Contraindicated contraindicated;

    @ManyToOne
    @MapsId("medicineId")
    @JoinColumn(name = "id_medicine", nullable = false, columnDefinition = "VARCHAR(10)")
    private Medicine medicine;
}
