package com.carparts.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.Null;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "seller_profile")
public class SellerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id" ,nullable = false , unique = true)
    private User user;

    @Column(nullable = false, name = "business_name")
    private String businessName;

    @Column(nullable = false, name = "business_address")
    private String businessAddresss;

    @Column(nullable = false)
    private String gstin;

    @Column(nullable = false , name = "pan_number")
    private String  panNumber;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at" , nullable = false)
    private LocalDateTime updatedAt;
}
