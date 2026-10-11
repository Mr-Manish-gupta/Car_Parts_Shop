package com.carparts.entity;


import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "coupons")
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false ,length = 50)
    private String code;

    @Column(length = 20 , nullable = false)
    private String discountType;

    @Column(nullable = false)
    private Double discountValue;
    @Column(nullable = false)
    private Double minOrderValue;

    private Double maxDiscountCap;

    private String description;

    @Column(nullable = false)
    private boolean isActive;
}
