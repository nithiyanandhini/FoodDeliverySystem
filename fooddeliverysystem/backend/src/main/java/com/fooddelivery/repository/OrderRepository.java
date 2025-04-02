package com.fooddelivery.repository;

import com.fooddelivery.model.Order;
import com.fooddelivery.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomer(User customer);
}
