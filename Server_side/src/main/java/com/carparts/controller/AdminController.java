package com.carparts.controller;

import com.carparts.dto.product.ProductResponse;
import com.carparts.entity.*;
import com.carparts.service.AdminService;
import com.carparts.service.OrderService;
import com.carparts.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {


    private final AdminService adminService;
    private final OrderService orderService;
    private final ProductService productService;


    private AdminController(AdminService service, OrderService orderService, ProductService productService) {
        this.adminService = service;
        this.orderService = orderService;
        this.productService = productService;
    }


    @GetMapping("/sellers/request")
    public ResponseEntity<List<SellerRequest>>getPendingRequests (){
        return ResponseEntity.ok(adminService.getPendingRequests());
    }


    @PutMapping("/sellers/{requestId}/approve")
    public ResponseEntity<Map<String ,String >> approveSeller(@PathVariable Long requestId){
        String message = adminService.approveSellerRequest(requestId);
        Map<String , String > response = new HashMap<>();
        response.put("message", message);
        return ResponseEntity.ok(response);
    }


    @PutMapping("/sellers/{requestId}/rejected")
    public ResponseEntity<Map<String , String >> rejectedSeller (@PathVariable Long requestId){
        String  message = adminService.rejectSellerRequest(requestId);
        Map<String , String> response
                 = new HashMap<>();
        response.put("message",message);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUser (){
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @GetMapping("/sellers")
    public ResponseEntity<List<SellerProfile>> getAllSellerProfiles(){
        return ResponseEntity.ok(adminService.getSellerProfiles());
    }

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders(){
        return ResponseEntity.ok(orderService.getAllOrder());
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }
}
