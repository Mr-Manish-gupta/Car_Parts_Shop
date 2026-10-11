package com.carparts.dto.paymentOrder;


import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentVerifyRequest {


    @NotBlank(message = "Razorpay Order Id cannot be blank")
    private String razorpayOrderId;

    @NotBlank(message = "Razorpay payment Id cannot be blank")
    private String razorpayPaymentId;

    @NotBlank(message = "Razorpay signature Id cannot be blank")
    private String razorpaySignature;

    public static class ReviewRequest {
    }
}
