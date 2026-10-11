package com.carparts.repository;

import com.carparts.entity.Product;
import com.carparts.entity.ProductCarCompatibility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductCarCompatibilityRepository extends JpaRepository<ProductCarCompatibility, Long> {

    void deleteByProduct(Product product);


    List<ProductCarCompatibility> findByProduct(Product product);

    @Query("SELECT p.product FROM ProductCarCompatibility p WHERE p.car.id = :carId")
    List<Product> findProductsByCarId(@Param("carId") Long carId);
}
