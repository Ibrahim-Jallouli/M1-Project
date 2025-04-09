package com.ProjetM1.CERIInspireShop.controller;

import com.ProjetM1.CERIInspireShop.dto.LogoutRequest;
import com.ProjetM1.CERIInspireShop.model.User;
import com.ProjetM1.CERIInspireShop.service.UserService;
import com.ProjetM1.CERIInspireShop.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/secureApi/auth")
public class LogoutController {

    @Autowired
    UserService userService;

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody LogoutRequest logoutRequest) {
        User user = userService.findUserByEmail(logoutRequest.getEmail());
        user.setActive(false);
        userService.updateActiveFieldOfUser(user);
        return ResponseEntity.ok("User disconnected successfully");
    }

}
