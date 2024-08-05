package com.medicine.medicine.Repository;

import com.medicine.medicine.Entity.Contraindicated;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ContraindicatedRepository extends JpaRepository<Contraindicated, Long> {
    Optional<Contraindicated> findByName(String name);
}