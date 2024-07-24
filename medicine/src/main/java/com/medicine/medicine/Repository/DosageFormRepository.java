package com.medicine.medicine.Repository;

import com.medicine.medicine.Entity.DosageForm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DosageFormRepository extends JpaRepository<DosageForm, Long> {
    Optional<DosageForm> findByName(String name);
}
