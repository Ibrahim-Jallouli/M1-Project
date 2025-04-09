package com.ProjetM1.CERIInspireShop.security.utils;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class BCrypter {
    private static final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public static String hash(String plainText) {
        return passwordEncoder.encode(plainText);
    }

    public static boolean check(String plainText, String hashedText) {
        return passwordEncoder.matches(plainText, hashedText);
    }
}
