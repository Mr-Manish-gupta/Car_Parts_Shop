package com.carparts.entity;

import com.carparts.enums.SellerStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "seller_request")
public class SellerRequest {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user.id" , nullable = false)
    private User user;

    @Column(name = "business_name", nullable = false)
    private String businessName;

    @Column (name = "business_add", nullable = false)
    private String businessAddress;

    @Column (nullable = false)
    private String gstin;

    @Column(name = "pan_number", nullable = false)
    private String panNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private SellerStatus status = SellerStatus.PENDING;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false,updatable = false)
    private LocalDateTime createdAt;

    @CreationTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
