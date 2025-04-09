package com.ProjetM1.CERIInspireShop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CartItemRequest {
    private int quantity;
    private long cartId;
    private long productId;
}
