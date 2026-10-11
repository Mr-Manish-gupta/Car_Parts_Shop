package com.carparts.repository;

import com.carparts.entity.OrderItem;
import com.carparts.entity.Product;
import com.carparts.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findBySeller(User seller);


    @Query("SELECT COUNT(oi) > 0 FROM OrderItem oi WHERE oi.order.user = :user AND oi.product = :product AND (oi.order.paymentStatus = 'COMPLETED' OR oi.order.orderStatus != 'CANCELLED')")
    boolean hasUserPurchasedProduct(@Param("user") User user, @Param("product") Product product);
}
