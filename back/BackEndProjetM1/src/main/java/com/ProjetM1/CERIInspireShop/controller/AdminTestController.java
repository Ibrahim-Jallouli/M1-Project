package com.ProjetM1.CERIInspireShop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/testAdminJwt")
public class AdminTestController {
    @GetMapping("/adminTest")
    public ResponseEntity<?> testAdmin() {
        return ResponseEntity.ok("ADMIN has access");
    }
}
