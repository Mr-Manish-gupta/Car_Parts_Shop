package com.carparts.service;


import com.carparts.entity.*;
import com.carparts.enums.OrderStatus;
import com.carparts.enums.PaymentStatus;
import com.carparts.exception.BadRequestException;
import com.carparts.exception.ResourceNotFoundException;
import com.carparts.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private  final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final AddressRepository addressRepository;
    private final OrderItemRepository orderItemRepository;

    public OrderService(OrderRepository orderRepository ,
            ProductRepository productRepository,
                        UserRepository userRepository,
                        CartItemRepository cartItemRepository
            ,CartRepository cartRepository
            ,AddressRepository addressRepository , OrderItemRepository orderItemRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.cartItemRepository = cartItemRepository;
        this.cartRepository = cartRepository;
        this.addressRepository = addressRepository;
        this.orderItemRepository = orderItemRepository;

    }

    @Transactional
    public Order placeOrder(User user , Long addressId){
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Cart is not found for user: " + user.getName()));

        if(cart.getCartItems() == null || cart.getCartItems().isEmpty()){
            throw new BadRequestException("Cannot place order without order. Your shopping cart is empty.");
        }
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address is not found with ID: " + addressId));

        if(!address.getUser().getId().equals(user.getId())){
            throw new BadRequestException("Address not found with ID: " + addressId);
        }


        Order order = Order.builder()
                .user(user)
                .shippingAddress(address)
                .orderStatus(OrderStatus.PENDING)
                .paymentStatus(PaymentStatus.PENDING)
                .totalAmount(BigDecimal.ZERO)
                .build();

        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for(CartItem cartItem : cart.getCartItems()){
            Product product = cartItem.getProduct();

            if(cartItem.getQuantity() > product.getStock()){
                throw new BadRequestException("Insufficient stock for cartItem with quantity: " + product.getStock());
            }

            product.setStock(product.getStock()-cartItem.getQuantity());
            productRepository.save(product);

            BigDecimal itemPrice = product.getPrice();
            BigDecimal subtotal =
                    itemPrice.multiply(BigDecimal.valueOf(cartItem.getQuantity()));
            totalAmount = totalAmount.add(subtotal);


            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .seller(product.getSeller())
                    .quantity(cartItem.getQuantity())
                    .price(itemPrice)
                    .subtotal(subtotal)
                    .build();

            orderItems.add(orderItem);
        }

        order.setTotalAmount(totalAmount);
        order.setOrderItem(orderItems);


        Order savedOrder = orderRepository.save(order);


        cartItemRepository.deleteAll(cart.getCartItems());
        cart.getCartItems().clear();
        cartRepository.save(cart);


        return savedOrder;

    }

    public List<Order> getUserOrders(User user){
        return orderRepository.findByUser(user);
    }

    public List<OrderItem> getSellerOrderItems(User seller){
        return orderItemRepository.findBySeller(seller);
    }

    public List<Order> getAllOrder() {
        return orderRepository.findAll();
    }

    @Transactional
    public  Order updateOrderStatus(Long orderId, OrderStatus status){
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order is not found with ID: " + orderId));
        order.setOrderStatus(status);
        return orderRepository.save(order);
    }

 }
