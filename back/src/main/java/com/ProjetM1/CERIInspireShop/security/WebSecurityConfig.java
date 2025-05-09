package com.ProjetM1.CERIInspireShop.security;

import com.ProjetM1.CERIInspireShop.security.jwt.JwtTokenFilter;
import com.ProjetM1.CERIInspireShop.service.UserService;
import com.ProjetM1.CERIInspireShop.service.impl.UserServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    private final UserServiceImpl userService;
    private final JwtTokenFilter jwtTokenFilter;


    public WebSecurityConfig(UserServiceImpl userService, JwtTokenFilter jwtTokenFilter) {
        this.userService = userService;
        this.jwtTokenFilter = jwtTokenFilter;
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, PasswordEncoder bCryptPasswordEncoder)
            throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(userService).passwordEncoder(passwordEncoder());
        return authenticationManagerBuilder.build();
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(matcherRegistry -> matcherRegistry
                        .requestMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                        .requestMatchers("/publicApi/**").permitAll()
                        .requestMatchers(
                                antMatcher("/"),
                                antMatcher("/login"),
                                antMatcher("/signin"),
                                antMatcher("/accueil"),
                                antMatcher("/index.html"),
                                antMatcher("/static/**"),
                                antMatcher("/**/*.css"),
                                antMatcher("/**/*.js"),
                                antMatcher("/**/*.png"),
                                antMatcher("/**/*.jpg"),
                                antMatcher("/**/*.jpeg"),
                                antMatcher("/**/*.gif"),
                                antMatcher("/**/*.svg"),
                                antMatcher("/**/*.ico"),
                                antMatcher("/**/*.woff2"),
                                antMatcher("/**/*.woff"),
                                antMatcher("/**/*.ttf"),
                                antMatcher("/**/*.eot")).permitAll()
                        .requestMatchers("/api/testAdminJwt/**").hasRole("ADMIN")
                        .requestMatchers("/api/testUserJwt/**").hasRole("USER")
                        .anyRequest().authenticated())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtTokenFilter,UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
