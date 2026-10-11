package com.carparts.dto.product;

import com.carparts.entity.Car;

import lombok.*;

import javax.swing.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {

    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private String imageUrl;
    private List<String> images;
    private String  partNumber;
    private Long categoryId;
    private String categoryName;
    private Long sellerId;
    private String sellerName;
    private List<Car> compatibleCars;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
