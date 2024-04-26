package com.ProjetM1.CERIInspireShop.service;

import com.ProjetM1.CERIInspireShop.dto.ProductDto;
import com.ProjetM1.CERIInspireShop.dto.ProductWithImageDto;
import com.ProjetM1.CERIInspireShop.model.Product;

import java.util.List;

public interface ProductService {
    List<ProductWithImageDto> getAllProducts();
    List<ProductWithImageDto> getProductOfCategoryById(Long categoryId);

    ProductWithImageDto getProductWithImageById(Long productId);
}
