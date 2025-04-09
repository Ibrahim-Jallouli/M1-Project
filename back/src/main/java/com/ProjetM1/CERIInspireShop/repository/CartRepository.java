package com.ProjetM1.CERIInspireShop.repository;

import com.ProjetM1.CERIInspireShop.model.Cart;
import com.ProjetM1.CERIInspireShop.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart,Long> {

}
