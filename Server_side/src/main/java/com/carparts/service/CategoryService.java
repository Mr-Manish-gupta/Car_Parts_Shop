package com.carparts.service;


import com.carparts.entity.Category;
import com.carparts.exception.BadRequestException;
import com.carparts.repository.CategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService (CategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }


    @Transactional
    public Category createCategory(String name){
        if(categoryRepository.existsByName(name)){
            throw new BadRequestException("Category already exists" + name);
        }

        Category category = Category.builder().name(name).build();
        return categoryRepository.save(category);
    }

    public List<Category> findAllCategory(){
        return  categoryRepository.findAll();
    }
}
