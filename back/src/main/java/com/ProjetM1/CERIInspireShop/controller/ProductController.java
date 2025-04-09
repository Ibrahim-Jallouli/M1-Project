package com.ProjetM1.CERIInspireShop.controller;

import com.ProjetM1.CERIInspireShop.dto.ProductDto;
import com.ProjetM1.CERIInspireShop.dto.ProductWithImageDto;
import com.ProjetM1.CERIInspireShop.model.Category;
import com.ProjetM1.CERIInspireShop.model.Product;
import com.ProjetM1.CERIInspireShop.service.CategoryService;
import com.ProjetM1.CERIInspireShop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/publicApi/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("")
    public ResponseEntity<List<ProductWithImageDto>> getAllProducts() {
        List<ProductWithImageDto> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/categoryProduct/{categoryId}")
    public ResponseEntity<List<ProductWithImageDto>> getSubCategoriesOfCategory(@PathVariable Long categoryId) {
        List<ProductWithImageDto> categoryProduct = productService.getProductOfCategoryById(categoryId);
        return ResponseEntity.ok(categoryProduct);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<ProductWithImageDto> getProductById(@PathVariable Long productId) {
        ProductWithImageDto productWithImageDto = productService.getProductWithImageById(productId);
        return ResponseEntity.ok(productWithImageDto);
    }
}

