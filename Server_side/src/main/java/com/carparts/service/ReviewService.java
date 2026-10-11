package com.carparts.service;

import com.carparts.dto.Review.ReviewRequest;
import com.carparts.dto.Review.ReviewResponse;
import com.carparts.entity.Product;
import com.carparts.entity.Review;
import com.carparts.entity.User;
import com.carparts.exception.BadRequestException;
import com.carparts.exception.ResourceNotFoundException;
import com.carparts.repository.OrderItemRepository;
import com.carparts.repository.ProductRepository;
import com.carparts.repository.ReviewRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final OrderItemRepository  orderItemRepository;

    public ReviewService(
            ReviewRepository reviewRepository,
            ProductRepository productRepository,
            OrderItemRepository orderItemRepository
    ) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
        this.orderItemRepository = orderItemRepository;
    }


    @Transactional
    public ReviewResponse addReview(User user, ReviewRequest request){
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found this ID: " + request.getProductId()));


        boolean hashPurchased = orderItemRepository.hasUserPurchasedProduct(user, product);
        if(!hashPurchased){
            throw new BadRequestException("Review denied! You can only review product that you have purchased");
        }

        if(reviewRepository.existsByUserAndProduct(user, product)){
            throw new BadRequestException("You have already reviewed this product");
        }

        Review review = Review.builder()
                .user(user)
                .product(product)
                .rating(String.valueOf(request.getRating()))
                .comment(request.getComment())
                .build();

        Review savedReview = reviewRepository.save(review);
        return  mapTOReviewRespones(savedReview);
    }

    public List<ReviewResponse> productReviews(Long productId){
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found this ID: " + productId));

        return reviewRepository.findByProduct(product).stream()
                .map(this::mapTOReviewRespones)
                .collect(Collectors.toList());
    }

    private ReviewResponse mapTOReviewRespones(Review review){
        return ReviewResponse.builder()
                .id(review.getId())
                .userId(review.getUser().getId())
                .userName(review.getUser().getName())
                .productId(review.getProduct().getId())
                .productName(review.getProduct().getName())
                .rating(Integer.valueOf(review.getRating()))
                .comment(review.getComment())
                .createdAt(review.getCreateAt())
                .build();
    }
}
