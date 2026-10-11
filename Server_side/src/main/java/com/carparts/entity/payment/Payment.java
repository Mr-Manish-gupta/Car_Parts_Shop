package com.carparts.entity.payment;


import com.carparts.entity.Order;
import com.carparts.enums.PaymentMethod;
import com.carparts.enums.PaymentStatus;
import com.carparts.enums.SellerStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.cglib.core.Local;

import javax.swing.border.Border;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "payments")
@Entity
public class Payment {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id" , nullable = false)
    private Order order;

    @Column(nullable = false)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus paymentStatus;


//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
//    @Builder.Default
//    private SellerStatus status = SellerStatus.PENDING;

    @Column(name = "razorpay_order_id")
    private String razorpayOrderId;

    @Column(name= "razorpay_payment_id")
    private String razorpayPaymentId;

    @Column(name = "razorpay_signature")
    private String razorpaySignature;

    @CreationTimestamp
    @Column(nullable = false, unique = false, name = "created_at")
    private LocalDateTime createdAt;
}
