package com.carparts.controller;

import com.carparts.dto.cart.CartItemRequest;
import com.carparts.entity.Cart;
import com.carparts.security.CustomUserDetails;
import com.carparts.service.CartService;
import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {
     private final CartService cartService;


     public CartController(CartService cartService) {
        this.cartService = cartService;
     }

     @GetMapping
     public ResponseEntity<Cart> getCart(@AuthenticationPrincipal CustomUserDetails customUserDetails){
         Cart cart = cartService.getCartByUser(customUserDetails.getUser());
         return ResponseEntity.ok(cart);
     }

     @PostMapping
    public ResponseEntity<Cart> addItemsToCart(@RequestBody CartItemRequest request,
                                               @AuthenticationPrincipal CustomUserDetails userDetails){
         Cart cart = cartService.addProductToCart(
                 userDetails.getUser(),
                 request.getProductId(),
                 request.getQuantity()

         );
         return ResponseEntity.ok(cart);
     }

     @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<Cart> removeItemFromCart(@PathVariable Long cartItemId,
                    @AuthenticationPrincipal CustomUserDetails userDetails){
         Cart cart = cartService.removeItem(userDetails.getUser(),cartItemId);
         return ResponseEntity.ok(cart);
     }
}
