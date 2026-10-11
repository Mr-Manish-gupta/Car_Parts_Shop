package com.carparts.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Table(name = "categories")
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String name;
}
