package com.medicine.medicine.Service;

import com.medicine.medicine.Entity.Order;

import java.util.List;

public interface OrderService {
    List<Order> getAllOrders();

    Order getOrderById(String id);

    Order addOrder(Order order);

    Order updateOrder(Order order);

    void deleteOrder(String id);

    List<Order> getOrdersByStatus(String status);

    List<Order> getOrdersByStatusAndAccountId(String status, String accountId);

    List<Order> getOrdersByAccountId(String accountId);
}
