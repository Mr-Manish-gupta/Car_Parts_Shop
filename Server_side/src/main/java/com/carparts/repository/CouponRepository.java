package com.carparts.repository;

import com.carparts.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface CouponRepository extends JpaRepository<Coupon , Long> {

    Optional<Coupon> findByCodeIgnoreCaseAndIsActiveTrue(String code);

    List<Coupon> findByIsActiveTrue();
}
