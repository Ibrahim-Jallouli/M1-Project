package com.ProjetM1.CERIInspireShop.controller;

import com.ProjetM1.CERIInspireShop.dto.JwtResponse;
import com.ProjetM1.CERIInspireShop.dto.LoginRequest;
import com.ProjetM1.CERIInspireShop.dto.LogoutRequest;
import com.ProjetM1.CERIInspireShop.model.User;
import com.ProjetM1.CERIInspireShop.security.jwt.JwtUtils;
import com.ProjetM1.CERIInspireShop.security.utils.BCrypter;
import com.ProjetM1.CERIInspireShop.service.UserService;
import com.ProjetM1.CERIInspireShop.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.Base64;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/publicApi/auth")
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserServiceImpl userService;


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            User user = userService.findUserByEmail(loginRequest.getEmail());

            user.setActive(true);

            userService.updateActiveFieldOfUser(user);

            String jwt = jwtUtils.generateJwtToken(user);

            return ResponseEntity.ok(new JwtResponse(jwt));

        }catch (AuthenticationException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Mot de passe ou email incorrect");
        }
    }


    @GetMapping("/hasher/{textToHash}")
    public ResponseEntity<?> hashText(@PathVariable String textToHash) {
            String response = BCrypter.hash(textToHash);
            return ResponseEntity.ok(response);
    }
}
