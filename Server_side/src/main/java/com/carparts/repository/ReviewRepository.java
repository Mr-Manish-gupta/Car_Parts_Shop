package com.carparts.repository;

import com.carparts.entity.Product;
import com.carparts.entity.Review;
import com.carparts.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {


    List<Review> findByProduct(Product product);

    boolean existsByUserAndProduct(User user, Product product);
}
