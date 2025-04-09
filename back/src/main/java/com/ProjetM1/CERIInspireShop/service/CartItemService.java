package com.ProjetM1.CERIInspireShop.service;

import com.ProjetM1.CERIInspireShop.model.CartItem;

public interface CartItemService {
    void addCartItemToCart(int quantity,Long cartId,Long productId,CartService cartService);
    CartItem getCartItemById(Long cartItemId);
    void deleteCartItemById(Long cartItemId);
    void deleteCartItemsByProductId(Long cartId,Long productId);
}
