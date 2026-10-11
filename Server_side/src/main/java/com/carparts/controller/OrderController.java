package com.carparts.controller;


import com.carparts.entity.Order;
import com.carparts.enums.OrderStatus;
import com.carparts.security.CustomUserDetails;
import com.carparts.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService){
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Order> placeOrder(@RequestParam Long addressId,
                                            @AuthenticationPrincipal CustomUserDetails userDetails){
        Order order = orderService.placeOrder(userDetails.getUser(), addressId);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @GetMapping("/my")
    public ResponseEntity<List<Order>> getMyOrders(@AuthenticationPrincipal CustomUserDetails userDetails){
        List<Order> orders = orderService.getUserOrders(userDetails.getUser());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestParam OrderStatus status){
        Order update = orderService.updateOrderStatus(id, status);
        return  ResponseEntity.ok(update);
    }
}
