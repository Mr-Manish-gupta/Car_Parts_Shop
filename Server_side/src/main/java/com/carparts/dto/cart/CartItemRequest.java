package com.carparts.dto.cart;


import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Setter
@Getter
public class CartItemRequest {

    private Long productId;
    private Integer quantity;
}
