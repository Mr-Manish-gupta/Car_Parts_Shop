package com.carparts.controller;

import com.carparts.dto.Review.ReviewRequest;
import com.carparts.dto.Review.ReviewResponse;
import com.carparts.security.CustomUserDetails;
import com.carparts.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // Authenticated endpoint to post review
    @PostMapping
    public ResponseEntity<ReviewResponse> addReview(
            @Valid @RequestBody ReviewRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        ReviewResponse response = reviewService.addReview(userDetails.getUser(),request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Public endpoint to view reviews of a product
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ReviewResponse>> getProductReviews(@PathVariable Long productId) {
        List<ReviewResponse> reviews = reviewService.productReviews(productId);
        return ResponseEntity.ok(reviews);
    }
}