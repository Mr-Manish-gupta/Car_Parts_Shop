package com.carparts.repository;

import com.carparts.entity.Order;
import com.carparts.entity.payment.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {


    Optional<Payment> findByRazorpayOrderId(String razorpayOrderId);

    Optional<Payment> findByOrder(Order order);
}
