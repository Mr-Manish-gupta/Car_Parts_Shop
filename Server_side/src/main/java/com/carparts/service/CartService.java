package com.carparts.service;


import com.carparts.entity.Cart;
import com.carparts.entity.CartItem;
import com.carparts.entity.Product;
import com.carparts.entity.User;
import com.carparts.exception.BadRequestException;
import com.carparts.exception.ResourceNotFoundException;
import com.carparts.repository.CartItemRepository;
import com.carparts.repository.CartRepository;
import com.carparts.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CartService {

    private CartRepository cartRepository;
    private CartItemRepository cartItemRepository;
    private ProductRepository productRepository;


    public CartService(CartRepository cartRepository , ProductRepository productRepository , CartItemRepository cartItemRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.cartItemRepository = cartItemRepository;
    }

    public Cart getCartByUser (User user){
        Cart c = cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart cart = Cart.builder()
                            .user(user).build();
                    return cartRepository.save(cart);
                });
        return c;
    }

    @Transactional
    public Cart addProductToCart(User user, Long productId, Integer quantity){
        Cart cart = getCartByUser(user);

        Product product= productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found" + productId));

        if(quantity <= 0 || quantity == null){
            throw new BadRequestException("Quantity must be greater than 0");
        }

        if( product.getStock() == null || quantity > product.getStock()){
            throw new RuntimeException("Not enough stock");
        }

        if(cart.getCartItems() == null){
            cart.setCartItems(new ArrayList<>());
        }

        for(CartItem cartItem : cart.getCartItems()){
            if (cartItem.getProduct().getId().equals(product.getId())){
                int total = cartItem.getQuantity() + quantity;

                if(total > product.getStock()){
                    throw new RuntimeException("not enough stock");
                }

                cartItem.setQuantity(total);
                cartItemRepository.save(cartItem);

                return cart;
            }
        }

        CartItem cartItem = new CartItem();

        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);


        cartItemRepository.save(cartItem);

        return cart;
    }

    @Transactional
    public Cart removeItem(User user, Long cartItemId){
        Cart cart = getCartByUser(user);


        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));

        if(!cartItem.getCart().getId().equals(cart.getId())){
            throw new RuntimeException("Cart not belong to this user");
        }

        cart.getCartItems().remove(cartItem);
        cartItemRepository.delete(cartItem);
        return cart;
    }

}
