package com.medicine.medicine.Repository;

import com.medicine.medicine.Entity.DetailOrder;
import com.medicine.medicine.Entity.DetailOrderPK;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DetailOrderRepository extends JpaRepository<DetailOrder, DetailOrderPK> {
    @Query("SELECT d FROM DetailOrder d WHERE d.id.idOrder = :idOrder")
    List<DetailOrder> findByIdOrder(@Param("idOrder") String idOrder);

    @Query("SELECT COUNT(d) FROM DetailOrder d WHERE d.id.idOrder = :idOrder AND d.seri.medicine.id = :medicineId")
    long countBySeriMedicineId(@Param("idOrder") String orderId, @Param("medicineId") String medicineId);

    @Query("SELECT d FROM DetailOrder d WHERE d.order.id = :orderId AND d.seri.medicine.id = :medicineId")
    List<DetailOrder> findByOrderIdAndMedicineId(@Param("orderId") String orderId, @Param("medicineId") String medicineId);

    @Modifying
    @Transactional
    @Query("DELETE FROM DetailOrder d WHERE d.order.id = :orderId AND d.seri.medicine.id = :medicineId")
    void deleteByOrderIdAndMedicineId(@Param("orderId") String orderId, @Param("medicineId") String medicineId);
}