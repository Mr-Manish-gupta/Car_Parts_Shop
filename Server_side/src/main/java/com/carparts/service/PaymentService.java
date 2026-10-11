package com.carparts.service;

import com.carparts.dto.paymentOrder.PaymentOrderResponse;
import com.carparts.dto.paymentOrder.PaymentVerifyRequest;
import com.carparts.entity.Order;
import com.carparts.entity.User;
import com.carparts.enums.OrderStatus;
import com.carparts.enums.PaymentMethod;
import com.carparts.enums.PaymentStatus;
import com.carparts.exception.BadRequestException;
import com.carparts.exception.ResourceNotFoundException;
import com.carparts.repository.OrderRepository;
import com.carparts.repository.PaymentRepository;
import com.carparts.entity.payment.Payment;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import jakarta.transaction.Transactional;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class PaymentService {

    private OrderRepository orderRepository;
    private PaymentRepository paymentRepository;

    public  PaymentService(OrderRepository orderRepository, PaymentRepository paymentRepository) {
        this.orderRepository = orderRepository;
        this.paymentRepository = paymentRepository;
    }


    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    @Value("${developer.razorpay.account.id:}")
    private String developerAccountId;

    @Transactional
    public PaymentOrderResponse createRazorpayOrder(User user , Long orderId){
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order Not Found with ID: " + orderId));

        if(!order.getUser().getId().equals(user.getId())){
            throw new BadRequestException("You are not authorized to perform this order!");
        }

        try{
            RazorpayClient razorpayClient = new RazorpayClient(keyId , keySecret);
            int amountInPaise = order.getTotalAmount().multiply(BigDecimal.valueOf(100)).intValue();

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amountInPaise);
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "order_rcptid" + order.getId());

            // 🌟 0.5% Developer Platform Commission Split (Razorpay Route)
            if (developerAccountId != null && !developerAccountId.trim().isEmpty()) {
                int developerCommissionPaise = Math.max(1, (int) Math.round(amountInPaise * 0.005));
                org.json.JSONArray transfers = new org.json.JSONArray();
                JSONObject devTransfer = new JSONObject();
                devTransfer.put("account", developerAccountId.trim());
                devTransfer.put("amount", developerCommissionPaise);
                devTransfer.put("currency", "INR");
                transfers.put(devTransfer);
                orderRequest.put("transfers", transfers);
            }

          com.razorpay.Order razorpayOrder = razorpayClient.orders.create(orderRequest);
            String rzpOrderId = razorpayOrder.get("id");



            Payment payment = paymentRepository.findByOrder(order)
                    .orElse(Payment.builder()
                            .order(order)
                            .amount(order.getTotalAmount())
                            .build());

            payment.setPaymentMethod(PaymentMethod.ONLINE);
            payment.setPaymentStatus(PaymentStatus.PENDING);
            payment.setRazorpayOrderId(rzpOrderId);


            paymentRepository.save(payment);

            return PaymentOrderResponse.builder()
                    .orderId(order.getId())
                    .razorpayOrderId(rzpOrderId)
                    .amount(order.getTotalAmount())
                    .currency("INR")
                    .razorpayKeyId(keyId)
                    .build();
        }catch (RazorpayException e){
            throw new BadRequestException("Error creating Razorpay Order: " + e.getMessage());
        }
    }


    @Transactional
    public String verifyPayment(PaymentVerifyRequest request){
        Payment payment= paymentRepository.findByRazorpayOrderId(request.getRazorpayOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("payment record not found for razorpay Order ID: " + request.getRazorpayOrderId()));


        try {
            JSONObject options = new JSONObject();
            options.put("razorpay_order_id", request.getRazorpayOrderId());
            options.put("razorpay_payment_id", request.getRazorpayPaymentId());
            options.put("razorpay_signature", request.getRazorpaySignature());


            boolean isValid = Utils.verifyPaymentSignature(options, keySecret);

            if (isValid){
             payment.setPaymentStatus(PaymentStatus.COMPLETED);
             payment.setRazorpayPaymentId(request.getRazorpayPaymentId());
             payment.setRazorpayOrderId(request.getRazorpayOrderId());
             paymentRepository.save(payment);

             Order order = payment.getOrder();
             order.setPaymentStatus(PaymentStatus.COMPLETED);
             order.setOrderStatus(OrderStatus.PROGRESSED);
             orderRepository.save(order);

             return "Payment verifid successfully! Your order is now processing";
            }else {
                payment.setPaymentStatus(PaymentStatus.FAILED);
                paymentRepository.save(payment);
                throw new BadRequestException("Invalid payment signature Payment verification failed");
            }
        }catch (Exception e){
            payment.setPaymentStatus(PaymentStatus.FAILED);
            paymentRepository.save(payment);
            throw new BadRequestException("Payment verification failed" + e.getMessage());
        }
    }

    @Transactional
    public String createCodPayment (User user , Long orderId){
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));

        if(!order.getUser().getId().equals(user.getId())){
            throw new BadRequestException("You are not authorized to perform this order!");
        }


        Payment payment = paymentRepository.findByOrder(order)
                .orElse(Payment.builder()
                        .order(order)
                        .amount(order.getTotalAmount())
                        .build());


        payment.setPaymentMethod(PaymentMethod.COD);
        payment.setPaymentStatus(PaymentStatus.PENDING);
        paymentRepository.save(payment);

        order.setPaymentStatus(PaymentStatus.PENDING);
        order.setOrderStatus(OrderStatus.PROGRESSED);
        orderRepository.save(order);

        return "Order confirmed with Cash on delivery! Pay when your order arrives";
    }
}

