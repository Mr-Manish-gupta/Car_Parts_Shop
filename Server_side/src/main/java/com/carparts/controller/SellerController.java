package com.carparts.controller;


import com.carparts.dto.seller.SellerRequestDto;
import com.carparts.entity.OrderItem;
import com.carparts.entity.SellerRequest;
import com.carparts.security.CustomUserDetails;
import com.carparts.service.OrderService;
import com.carparts.service.SellerService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/seller")
public class SellerController {


    private final SellerService service;
    private final OrderService orderService;

    private SellerController(SellerService service , OrderService orderService){
        this.service = service;
        this.orderService = orderService;
    }


    @PostMapping("/request")
    public ResponseEntity<Map<String , String >> requestToBecomeSeller(@Valid @RequestBody SellerRequestDto dto,
                                                                       @AuthenticationPrincipal CustomUserDetails details){
        String message = service.applyToBecomeSeller(dto, details.getUser());
        Map<String ,String > response = new HashMap<>();
        response.put("message", message);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderItem>> getMyOrders(@AuthenticationPrincipal CustomUserDetails details){
        List<OrderItem> items = orderService.getSellerOrderItems(details.getUser());
        return ResponseEntity.ok(items);
    }
}
