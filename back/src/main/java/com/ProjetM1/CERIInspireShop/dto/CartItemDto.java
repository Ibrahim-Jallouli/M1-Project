package com.ProjetM1.CERIInspireShop.dto;

import com.ProjetM1.CERIInspireShop.model.CartItem;
import com.ProjetM1.CERIInspireShop.model.Product;
import com.ProjetM1.CERIInspireShop.model.ProductImage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDto {
    private Long cartItemId;
    private int quantity;
    private Long productId;
    private String name;
    private String description;
    private double price;
    private int productQuantity;
    private List<ImageDto> images = new ArrayList<>();

    public CartItemDto(CartItem cartItem){
        Product product = cartItem.getProduct();
        cartItemId=cartItem.getId();
        quantity=cartItem.getQuantity();
        this.productId = product.getProductId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.productQuantity = product.getQuantity();
        for (ProductImage image : product.getImages()) {
            this.images.add(new ImageDto(image));
        }
    }
}
