package com.ProjetM1.CERIInspireShop.dto;

import com.ProjetM1.CERIInspireShop.model.Product;
import com.ProjetM1.CERIInspireShop.model.ProductImage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProductWithImageDto {

    private Long productId;
    private String name;
    private String description;
    private double price;
    private int quantity;
    private List<ImageDto> images = new ArrayList<>();

    // Constructeur pour créer un ProductDTO à partir d'un Product
    public ProductWithImageDto(Product product) {
        this.productId = product.getProductId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.quantity = product.getQuantity();
        // Mapping des images
        for (ProductImage image : product.getImages()) {
            this.images.add(new ImageDto(image));
        }
    }
}
