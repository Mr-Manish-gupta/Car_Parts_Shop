package com.carparts.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Table(name = "cars")
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String model;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false)
    private String  variant;

    @Column(nullable = false, name = "fuel_type")
    private String fuelType;
}
