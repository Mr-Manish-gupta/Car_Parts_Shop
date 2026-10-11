package com.carparts.controller;


import com.carparts.dto.product.ProductRequest;
import com.carparts.dto.product.ProductResponse;
import com.carparts.entity.Product;
import com.carparts.security.CustomUserDetails;
import com.carparts.service.FileStorageService;
import com.carparts.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService productService;
    private final FileStorageService fileStorageService;
    public ProductController(ProductService productService,FileStorageService fileStorageService) {
        this.productService = productService;
        this.fileStorageService = fileStorageService;
    }

    // ============================== SELLER ACTION =================================//

    @PostMapping("/seller/product")
    public ResponseEntity<ProductResponse> createProduct(
            @Valid @RequestBody ProductRequest request ,
            @AuthenticationPrincipal CustomUserDetails userDetails
            ){

        ProductResponse response = productService.createProduct(request, userDetails.getUser());
        return  new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/seller/products/{id}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ){
        ProductResponse response = productService.updateProduct(id, request , userDetails.getUser());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/seller/product/{id}")
    public ResponseEntity<Map<String , String >> deleteProduct(
            @PathVariable Long id,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ){
        productService.deleteProduct(id, userDetails.getUser());
        Map<String , String> response = new HashMap<>();
        response.put("message", "Product was deleted Successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/seller/product/my")
    public ResponseEntity<List<ProductResponse>> getMyProducts(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ){
        List<ProductResponse> responses = productService.getProductBySeller(userDetails.getUser());
        return ResponseEntity.ok(responses);
    }

    @PostMapping(value = "/seller/products/{id}/upload-image")
    public ResponseEntity<ProductResponse> uploadProductImage(
            @PathVariable Long id,
            @RequestParam("image") MultipartFile image,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ){
        String imageUrl = fileStorageService.saveFile(image);

        ProductResponse response = productService.updateProductImage(id, imageUrl, userDetails.getUser());
        return ResponseEntity.ok(response);
    }


    // =============================== PUBLIC ACTIONS ================================ //
    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts(){
        return ResponseEntity.ok(productService.getAllProducts());
    }


    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/compatible/{carId}")
    public ResponseEntity<List<ProductResponse>> getAllProductsByCarId(@PathVariable Long carId){
        return ResponseEntity.ok(productService.getProductsByCar(carId));
    }
}
