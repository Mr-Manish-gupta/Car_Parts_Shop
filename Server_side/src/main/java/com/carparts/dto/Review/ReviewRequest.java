package com.carparts.dto.Review;


import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewRequest {

    @NotNull(message = "Product Id is required")
    private Long productId;

    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at leat 1 star")
    @Max(value = 5, message = "Rating must be at leat 5 star")
    private Integer rating;

    @NotBlank(message = "Review comment cannot be blank")
    private String comment;
}
