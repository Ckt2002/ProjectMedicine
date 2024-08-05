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
@Table(name = "effect_medicine")
public class EffectMedicine {

    @EmbeddedId
    private EffectMedicinePK id;

    @ManyToOne
    @MapsId("effectId")
    @JoinColumn(name = "id_effect", nullable = false)
    private Effect effect;

    @ManyToOne
    @MapsId("medicineId")
    @JoinColumn(name = "id_medicine", nullable = false, columnDefinition = "VARCHAR(10)")
    private Medicine medicine;
}
