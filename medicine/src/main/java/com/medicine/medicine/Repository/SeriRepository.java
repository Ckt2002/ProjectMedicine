package com.medicine.medicine.Repository;

import com.medicine.medicine.Entity.Seri;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SeriRepository extends JpaRepository<Seri, String> {
    List<Seri> findByMedicine_Id(String medicineId);

    @Query("SELECT COUNT(s) FROM Seri s WHERE s.medicine.id = :idMedicine AND s.status = :status")
    long countByMedicineIdAndStatus(@Param("idMedicine") String idMedicine, @Param("status") String status);

    @Query("SELECT s FROM Seri s WHERE s.medicine.id = :medicineId")
    List<Seri> findByMedicineId(@Param("medicineId") String medicineId);

    @Query("SELECT s FROM Seri s WHERE s.medicine.id = :medicineId AND s.status = 'new'")
    List<Seri> findByMedicineIdAndStatusNew(@Param("medicineId") String medicineId);
}
