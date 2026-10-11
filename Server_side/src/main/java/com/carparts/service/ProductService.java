package com.carparts.service;


import com.carparts.dto.product.ProductRequest;
import com.carparts.dto.product.ProductResponse;
import com.carparts.entity.*;
import com.carparts.exception.BadRequestException;
import com.carparts.exception.ResourceNotFoundException;
import com.carparts.repository.CarRepository;
import com.carparts.repository.CategoryRepository;
import com.carparts.repository.ProductCarCompatibilityRepository;
import com.carparts.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CarRepository carRepository;
    private final ProductCarCompatibilityRepository compatibilityRepository;

    public ProductService(
            ProductRepository productRepository,
            CategoryRepository categoryRepository,
            CarRepository carRepository,
            ProductCarCompatibilityRepository compatibilityRepository
    ){
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.carRepository = carRepository;
        this.compatibilityRepository = compatibilityRepository;
    }

    @Transactional
    public ProductResponse createProduct (ProductRequest request, User seller){
        if(productRepository.existsByPartNumber(request.getPartNumber())){
            throw new BadRequestException("Product with part number " + request.getPartNumber() +  "already exists!");
        }


        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category with id " + request.getCategoryId() + " not found!"));

        List<String> productImages = new ArrayList<>();
        if (request.getImages() != null && !request.getImages().isEmpty()) {
            for (String img : request.getImages()) {
                if (img != null && !img.trim().isEmpty()) {
                    productImages.add(img.trim());
                }
            }
        }
        if (productImages.isEmpty() && request.getImageUrl() != null && !request.getImageUrl().trim().isEmpty()) {
            productImages.add(request.getImageUrl().trim());
        }

        if (productImages.size() < 4) {
            throw new BadRequestException("Please provide at least 4 product images (Front, Side, Back, Details/Label)!");
        }

        String mainImageUrl = productImages.get(0);

        Product product = com.carparts.entity.Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .category(category)
                .price(request.getPrice())
                .stock(request.getStock())
                .partNumber(request.getPartNumber())
                .imageUrl(mainImageUrl)
                .images(productImages)
                .seller(seller)
                .build();

        Product savedProduct = productRepository.save(product);


        List<Car> compatibility = new ArrayList<>();
        if(request.getCompatibleCarIds() != null && !request.getCompatibleCarIds().isEmpty()){
            for(Long carId : request.getCompatibleCarIds()){
                Car car = carRepository.findById(carId)
                        .orElseThrow(() -> new ResourceNotFoundException("Car with id " + carId + " not found!" ));


                ProductCarCompatibility compatibility1 = ProductCarCompatibility.builder()
                        .product(savedProduct)
                        .car(car)
                        .build();

                compatibilityRepository.save(compatibility1);
                compatibility.add(car);
            }
        }

        return mapToProductResponse (savedProduct, compatibility);
    }

    @Transactional
    public ProductResponse updateProduct (Long productId,ProductRequest request, User seller){
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID:" + productId));

        if (!product.getSeller().getId().equals(seller.getId())){
            throw new BadRequestException("You are not authorized to update this product!");
        }


        if(!product.getPartNumber().equals(request.getPartNumber()) &&
                productRepository.existsByPartNumber(request.getPartNumber())){
            throw new BadRequestException("Part number:" +  request.getPartNumber() + " already exists!");
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category with id :" + request.getCategoryId() + " not found!"));


        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setPartNumber(request.getPartNumber());
        product.setCategory(category);

        if (request.getImages() != null && !request.getImages().isEmpty()) {
            List<String> updateImgs = new ArrayList<>();
            for (String img : request.getImages()) {
                if (img != null && !img.trim().isEmpty()) {
                    updateImgs.add(img.trim());
                }
            }
            if (!updateImgs.isEmpty()) {
                product.setImages(updateImgs);
                product.setImageUrl(updateImgs.get(0));
            }
        } else if (request.getImageUrl() != null && !request.getImageUrl().trim().isEmpty()) {
            product.setImageUrl(request.getImageUrl().trim());
        }

        Product updatedProduct = productRepository.save(product);


        compatibilityRepository.deleteByProduct(updatedProduct);

        List<Car> compatibility = new ArrayList<>();
        if(request.getCompatibleCarIds() != null && !request.getCompatibleCarIds().isEmpty()){
            for(Long carId : request.getCompatibleCarIds()){
                Car car = carRepository.findById(carId)
                        .orElseThrow(() -> new ResourceNotFoundException("Car with id :" + carId + " not fount!"));

                ProductCarCompatibility compatibility1 = ProductCarCompatibility.builder()
                        .product(updatedProduct)
                        .car(car)
                        .build();

                compatibilityRepository.save(compatibility1);
                compatibility.add(car);
            }
        }

        return mapToProductResponse(updatedProduct, compatibility);
    }

    @Transactional
    public void deleteProduct (Long productId, User seller){
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID:" + productId ));


        if(!product.getSeller().getId().equals(seller.getId())){
            throw new BadRequestException("You are not authorized to delete this product");
        }

        compatibilityRepository.deleteByProduct(product);
        productRepository.delete(product);
    }


    @Transactional
    public ProductResponse getProductById(Long productId){
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found this product Id:" + productId ));

        List<Car> compatibility = compatibilityRepository.findByProduct(product)
                .stream()
                .map(ProductCarCompatibility::getCar)
                .collect(Collectors.toList());
        return mapToProductResponse(product, compatibility);
    }


    public List<ProductResponse> getProductBySeller(User seller){
        return productRepository.findBySeller(seller).stream()
                .map(product -> {
                    List<Car> comatibilityCars = compatibilityRepository.findByProduct(product)
                            .stream()
                            .map(ProductCarCompatibility::getCar)
                            .collect(Collectors.toList());

                    return mapToProductResponse(product, comatibilityCars);
                })
                .collect(Collectors.toList());
    }

    public List<ProductResponse> getProductsByCar(Long carId) {
        List<Product> products = compatibilityRepository.findProductsByCarId(carId);
        return products.stream()
                .map(product -> {
                    List<Car> compatibleCars = compatibilityRepository.findByProduct(product)
                            .stream()
                            .map(ProductCarCompatibility::getCar)
                            .collect(Collectors.toList());
                    return mapToProductResponse(product, compatibleCars);
                })
                .collect(Collectors.toList());
    }
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll().stream()
                .map(product -> {
                    List<Car> compatibleCars = compatibilityRepository.findByProduct(product)
                            .stream()
                            .map(ProductCarCompatibility::getCar)
                            .collect(Collectors.toList());
                    return mapToProductResponse(product, compatibleCars);
                })
                .collect(Collectors.toList());
    }


    private ProductResponse mapToProductResponse(Product product , List<Car> compatibilityCars){
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description((product.getDescription()))
                .price(product.getPrice())
                .stock(product.getStock())
                .partNumber(product.getPartNumber())
                .imageUrl(product.getImageUrl())
                .images(product.getImages() != null && !product.getImages().isEmpty()
                        ? product.getImages()
                        : (product.getImageUrl() != null ? java.util.Collections.singletonList(product.getImageUrl()) : new java.util.ArrayList<>()))
                .categoryId(product.getCategory().getId())
                .categoryName(product.getCategory().getName())
                .sellerId(product.getSeller().getId())
                .sellerName(product.getSeller().getName())
                .compatibleCars(compatibilityCars)
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }

    @Transactional
    public ProductResponse updateProductImage(Long productId, String imageUrl, User seller) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + productId));

        if (!product.getSeller().getId().equals(seller.getId())) {
            throw new BadRequestException("You are not authorized to update this product!");
        }

        product.setImageUrl(imageUrl);
        Product updatedProduct = productRepository.save(product);

        List<Car> compatibleCars = compatibilityRepository.findByProduct(updatedProduct)
                .stream()
                .map(ProductCarCompatibility::getCar)
                .collect(Collectors.toList());

        return mapToProductResponse(updatedProduct, compatibleCars);
    }
}
