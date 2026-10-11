package com.carparts.service;


import com.carparts.entity.Car;
import com.carparts.repository.CarRepository;
import com.carparts.repository.CategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {

    private final CarRepository carRepository;


    public CarService(CarRepository carRepository){
        this.carRepository = carRepository;
    }

    @Transactional
    public Car addCar(Car car){
        return carRepository.save(car);
    }

    public List<Car> getAllCars(){
        return carRepository.findAll();
    }

    public List<String> getDistinctBrand() {
        return carRepository.findDistinctBrand();
    }

    public List<String> getModelsByBrand(String brand){
        return carRepository.findDistinctModelByBrand(brand);
    }

    public List<Car> getCarsByFilters(String brand, String  model, Integer year){
        return  carRepository.findByBrandAndModelAndYear(brand, model ,year);
    }
}
