package com.fooddelivery.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private User customer;

    private String status; // e.g., RECEIVED, PREPARING, OUT_FOR_DELIVERY, DELIVERED

    private LocalDateTime orderTime;

    private double totalAmount;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items;
    public void setOrderTime(LocalDateTime orderTime) {
        this.orderTime = orderTime;
    }
    public void setStatus(String status) {
        this.status = status;
    }

}
