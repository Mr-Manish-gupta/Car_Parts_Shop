package com.carparts.controller;


import com.carparts.entity.Car;
import com.carparts.service.CarService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    private  final CarService carService;

    public CarController(CarService car){
        this.carService = car;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Car> addCar(@RequestBody Car car){
        Car savedCar = carService.addCar(car);
        return new ResponseEntity<>(savedCar, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Car>> getAllCars(){
        return ResponseEntity.ok(carService.getAllCars());
    }


    @GetMapping("/brands")
    public ResponseEntity<List<String>> getDistinctBrands(){
        return ResponseEntity.ok(carService.getDistinctBrand());
    }

    @GetMapping("/models")
    public ResponseEntity<List<String>> getModelsByBrand(@RequestParam String brand){
        return ResponseEntity.ok(carService.getModelsByBrand(brand));
    }
}
