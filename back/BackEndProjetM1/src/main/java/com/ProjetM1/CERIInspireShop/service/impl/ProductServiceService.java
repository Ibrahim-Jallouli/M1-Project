package com.ProjetM1.CERIInspireShop.service.impl;

import com.ProjetM1.CERIInspireShop.dto.ProductWithImageDto;
import com.ProjetM1.CERIInspireShop.model.Product;
import com.ProjetM1.CERIInspireShop.dto.ProductDto;
import com.ProjetM1.CERIInspireShop.repository.ProductRepository;
import com.ProjetM1.CERIInspireShop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceService implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<ProductWithImageDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(this::mapToProductWithImageDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductWithImageDto> getProductOfCategoryById(Long categoryId) {
        List<Product> products = productRepository.findByCategoryId(categoryId);
        return products.stream()
                .map(this::mapToProductWithImageDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductWithImageDto getProductWithImageById(Long productId) {
        Product product = productRepository.getProductsByProductId(productId);
        return new ProductWithImageDto(product);
    }

    private ProductDto mapToProductDTO(Product product) {
        return new ProductDto(product);
    }
    private ProductWithImageDto mapToProductWithImageDTO(Product product) {
        return new ProductWithImageDto(product);
    }
}
