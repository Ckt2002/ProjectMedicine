package com.medicine.medicine.Service.impl;

import com.medicine.medicine.Entity.Order;
import com.medicine.medicine.Repository.AccountRepository;
import com.medicine.medicine.Repository.OrderRepository;
import com.medicine.medicine.Service.OrderService;
import com.medicine.medicine.UtilityClass.RandomIdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(String id) {
        Optional<Order> order = orderRepository.findById(id);
        return order.orElseThrow(() -> new IllegalArgumentException("Order not found"));
    }

    @Override
    public Order addOrder(Order order) {
        order.setId(RandomIdGenerator.generateRandomId());
        validateAccount(order.getAccountUser().getId());
        order.setOrderDate(LocalDateTime.now());
        order.setUpdatedDate(LocalDateTime.now());
        return orderRepository.save(order);
    }

    @Override
    public Order updateOrder(Order order) {
        validateOrderExists(order.getId());
        validateAccount(order.getAccountUser().getId());
        order.setUpdatedDate(LocalDateTime.now());
        return orderRepository.save(order);
    }

    @Override
    public void deleteOrder(String id) {
        validateOrderExists(id);
        orderRepository.deleteById(id);
    }

    @Override
    public List<Order> getOrdersByStatus(String status) {
        return orderRepository.findByStatus(status);
    }

    @Override
    public List<Order> getOrdersByStatusAndAccountId(String status, String accountId) {
        return orderRepository.findByStatusAndAccountUserId(status, accountId);
    }

    @Override
    public List<Order> getOrdersByAccountId(String accountId) {
        return orderRepository.findByAccountUser_Id(accountId);
    }

    private void validateOrderExists(String orderId) {
        if (!orderRepository.existsById(orderId)) {
            throw new IllegalArgumentException("Order not found");
        }
    }

    private void validateAccount(String accountId) {
        if (!accountRepository.existsById(accountId)) {
            throw new IllegalArgumentException("Account not found");
        }
    }
}
