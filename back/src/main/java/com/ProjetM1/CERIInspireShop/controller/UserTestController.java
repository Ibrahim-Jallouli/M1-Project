package com.ProjetM1.CERIInspireShop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/testUserJwt")
public class UserTestController {

    @GetMapping("/userTest")
    public ResponseEntity<?> testUser() {
        return ResponseEntity.ok("USER has access");
    }

}
