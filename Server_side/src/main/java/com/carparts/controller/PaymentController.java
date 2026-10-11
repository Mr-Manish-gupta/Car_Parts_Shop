package com.carparts.controller;

import com.carparts.dto.paymentOrder.PaymentOrderResponse;
import com.carparts.dto.paymentOrder.PaymentVerifyRequest;
import com.carparts.security.CustomUserDetails;
import com.carparts.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {


    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }


    @PostMapping("/create-order")
    public ResponseEntity<PaymentOrderResponse> createOnlinePayment (
            @RequestParam Long orderId,
            @AuthenticationPrincipal CustomUserDetails userDetails
            ){
        PaymentOrderResponse response = paymentService.createRazorpayOrder(userDetails.getUser(), orderId);
        return ResponseEntity.ok(response);
    }


    @PostMapping("/verify")
    public ResponseEntity<Map<String , String >> verify (@Valid @RequestBody PaymentVerifyRequest paymentVerifyRequest){
        String message = paymentService.verifyPayment(paymentVerifyRequest);
        Map<String ,String > response = new HashMap<>();
        response.put("message", message);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/cod")
    public ResponseEntity<Map<String, String >> createCodPayment(@RequestParam Long orderId,
                                                                 @AuthenticationPrincipal CustomUserDetails userDetails){
        String  message = paymentService.createCodPayment(userDetails.getUser(), orderId);
        Map<String ,String > response = new HashMap<>();
        response.put("message", message);
        return ResponseEntity.ok(response);
    }

}
