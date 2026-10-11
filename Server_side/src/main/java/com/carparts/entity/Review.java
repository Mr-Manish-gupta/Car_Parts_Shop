package com.carparts.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Entity
@Builder
@Table(name = "reviews")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Review {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id" , nullable = false)
    private Product product;

    @Column(nullable = false)
    private String rating;

    @Column(columnDefinition = "TEXT" , nullable = false)
    private String comment;

    @CreationTimestamp
    @Column(name = "create_at" , nullable = false , updatable = false)
    private LocalDateTime createAt;

}
