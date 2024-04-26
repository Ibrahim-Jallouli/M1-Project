package com.ProjetM1.CERIInspireShop.service.impl;

import com.ProjetM1.CERIInspireShop.model.User;
import com.ProjetM1.CERIInspireShop.repository.UserRepository;
import com.ProjetM1.CERIInspireShop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = findUserByEmail(email);
        List<String> roles = new ArrayList<>();
        roles.add(user.getRole().toString().toUpperCase());
        UserDetails userDetails =
                org.springframework.security.core.userdetails.User.builder()
                        .username(user.getEmail())
                        .password(user.getPassword())
                        .roles(roles.toArray(new String[0]))
                        .build();
        return userDetails;
    }
}
