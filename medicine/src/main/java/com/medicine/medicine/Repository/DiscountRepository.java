package com.medicine.medicine.Repository;

import com.medicine.medicine.Entity.Discount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DiscountRepository extends JpaRepository<Discount, Long> {
    Optional<Discount> findByName(String name);
}
