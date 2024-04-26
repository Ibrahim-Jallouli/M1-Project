package com.ProjetM1.CERIInspireShop.service;

import com.ProjetM1.CERIInspireShop.model.User;

public interface UserService {
    User findUserByEmail(String email);
}
