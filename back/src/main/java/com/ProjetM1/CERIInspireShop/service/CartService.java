package com.ProjetM1.CERIInspireShop.service;

import com.ProjetM1.CERIInspireShop.dto.CartItemDto;
import com.ProjetM1.CERIInspireShop.model.Cart;
import com.ProjetM1.CERIInspireShop.model.CartItem;

import java.util.List;

public interface CartService {
    List<CartItemDto> getAllCartItems(Long cartId);
    Cart findCartById(Long cartId);
    void deleteCartItemFromCart(Long cartId,Long productId);
}
