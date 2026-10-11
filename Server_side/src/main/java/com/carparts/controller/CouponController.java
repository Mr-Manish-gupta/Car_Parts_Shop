package com.carparts.controller;


import com.carparts.repository.CouponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/coupons")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class CouponController {



    private final CouponRepository couponRepository;


    @PostMapping("/apply")
    public ResponseEntity<?> applyCoupon (@RequestBody Map<String  , Object> request){
        String  code = (String) request.get("code");
        if(code == null || code.isEmpty()){
            return ResponseEntity.badRequest().body(Map.of("valid", false , "message", "Please Enter a Coupon code."));
        }


        Double subtotal = Double.valueOf(request.get("subtotal").toString());

        return  couponRepository.findByCodeIgnoreCaseAndIsActiveTrue(code.trim())
                .map(coupon -> {
                    if(subtotal < coupon.getMinOrderValue()) {
                        return ResponseEntity.badRequest().body(Map.of(
                                "valid", false,
                                "message", "Minimum order value for" + coupon.getCode() + "is" + coupon.getMinOrderValue().intValue()
                        ));
                    }



                    double discount = 0.0;
                    if("PERCENTAGE".equalsIgnoreCase(coupon.getDiscountType())){
                        discount = (subtotal * coupon.getDiscountValue()) / 100.0;
                        if(coupon.getMaxDiscountCap() != null && discount > coupon.getMaxDiscountCap()) {
                            discount = coupon.getMaxDiscountCap();
                        }
                    }else {
                        discount = coupon.getDiscountValue();
                    }

                    if(discount > subtotal){
                        discount = subtotal;
                    }

                    return ResponseEntity.ok(Map.of(
                            "valid", true,
                            "code", coupon.getCode(),
                            "discountAmount", Math.round(discount),
                            "message", "coupon" + coupon.getCode() + "applied successfully"
                    ));
                })
                .orElse(ResponseEntity.badRequest().body(Map.of(
                        "valid", false,
                        "message", "Invalid Or Expired Coupon Code"
                )));
    }

    @GetMapping("/active")
    public ResponseEntity<?> getActiveCoupons() {
        return ResponseEntity.ok(couponRepository.findByIsActiveTrue());
    }
}
