package com.carparts.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Getter @Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    @JsonIgnore
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    @JsonIgnore
    private User seller;

    private Integer quantity;

    private BigDecimal price;

    private BigDecimal subtotal;

    public Long getOrderId() {
        return order != null ? order.getId() : null;
    }

    public String getOrderStatus() {
        return order != null && order.getOrderStatus() != null ? order.getOrderStatus().name() : "PENDING";
    }
}
