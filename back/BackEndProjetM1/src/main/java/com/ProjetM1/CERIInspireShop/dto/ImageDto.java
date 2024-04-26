package com.ProjetM1.CERIInspireShop.dto;


import com.ProjetM1.CERIInspireShop.model.Product;
import com.ProjetM1.CERIInspireShop.model.ProductImage;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ImageDto {
    private Long id;
    private String imageUrl;

    public ImageDto(ProductImage productImage){
        this.id = productImage.getId();
        this.imageUrl = productImage.getImageUrl();
    }
}
