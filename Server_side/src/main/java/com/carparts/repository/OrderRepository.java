package com.carparts.repository;

import com.carparts.entity.Order;
import com.carparts.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUser(User user);


}
