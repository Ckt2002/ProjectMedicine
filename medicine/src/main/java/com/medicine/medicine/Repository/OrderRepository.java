package com.medicine.medicine.Repository;

import com.medicine.medicine.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findByStatus(String status);
    List<Order> findByStatusAndAccountUserId(String status, String accountId);
    List<Order> findByAccountUser_Id(String accountId);
}
