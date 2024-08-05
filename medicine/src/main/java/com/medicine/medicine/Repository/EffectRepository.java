package com.medicine.medicine.Repository;

import com.medicine.medicine.Entity.Effect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EffectRepository extends JpaRepository<Effect, Long> {
    Optional<Effect> findByName(String name);
}