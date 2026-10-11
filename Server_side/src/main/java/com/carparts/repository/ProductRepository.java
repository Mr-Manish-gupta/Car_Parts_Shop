package com.carparts.repository;

import com.carparts.entity.Category;
import com.carparts.entity.Product;
import com.carparts.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findBySeller(User seller);
    List<Product> findByCategory(Category category);
    boolean existsByPartNumber(String partNumber);
    Optional<Product> findByPartNumber(String partNumber);
}
