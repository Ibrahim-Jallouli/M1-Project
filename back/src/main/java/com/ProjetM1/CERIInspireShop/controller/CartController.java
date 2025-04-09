package com.ProjetM1.CERIInspireShop.controller;

import com.ProjetM1.CERIInspireShop.dto.ApiResponse;
import com.ProjetM1.CERIInspireShop.dto.CartItemDto;
import com.ProjetM1.CERIInspireShop.dto.ParentCategoryDto;
import com.ProjetM1.CERIInspireShop.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/privateApi/cart")
public class CartController {

    @Autowired
    CartService cartService;

    @GetMapping("/allCartItems/{cartId}")
    public ResponseEntity<List<CartItemDto>> getCartItems(@PathVariable Long cartId) {
        List<CartItemDto> cartItems = cartService.getAllCartItems(cartId);
        return ResponseEntity.ok(cartItems);
    }

    @DeleteMapping("/deleteOneById/{cartId}/{cartItemId}")
    public ResponseEntity<?> deleteCartItemFromCartAndDb(@PathVariable Long cartId, @PathVariable Long cartItemId){
        try {
            cartService.deleteCartItemFromCart(cartId, cartItemId);
            return ResponseEntity.ok(new ApiResponse("ok", "Item successfully deleted"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse("error", e.getMessage()));
        }
    }
}
