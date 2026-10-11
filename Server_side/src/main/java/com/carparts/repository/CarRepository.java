package com.carparts.repository;

import com.carparts.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

    @Query("SELECT DISTINCT c.brand FROM Car c")
    List<String >findDistinctBrand();

    @Query("SELECT DISTINCT c.model FROM Car c WHERE c.brand = :brand")
    List<String > findDistinctModelByBrand(@Param("brand") String brand);

    List<Car>findByBrandAndModelAndYear(String  brand , String  model, Integer  year);
}
