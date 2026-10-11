package com.carparts.dto.product;


import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class ProductRequest {

    @NotBlank(message = "Name cannot be blank")
    private String name;


    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0" , inclusive = false, message = "Price must be greater than zero")
    private BigDecimal price;

    @NotNull(message = "Stock is required")
    @Min(value = 0, message = "Stock cannot be negative")
    private Integer stock;

    @NotBlank(message = "Part number cannot be blank")
    private String partNumber;

    private String imageUrl;

    private List<String> images;

    @NotNull(message = "Category Id is required")
    private Long categoryId;


    private List<Long> compatibleCarIds;
}
