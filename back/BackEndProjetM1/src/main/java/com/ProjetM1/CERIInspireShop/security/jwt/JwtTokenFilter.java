package com.ProjetM1.CERIInspireShop.security.jwt;

import com.ProjetM1.CERIInspireShop.repository.UserRepository;
import com.ProjetM1.CERIInspireShop.service.impl.UserServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {
    private JwtUtils jwtUtils;
    private UserServiceImpl userService;

    public JwtTokenFilter(JwtUtils jwtTokenUtil,
                          UserServiceImpl userService) {
        this.jwtUtils = jwtTokenUtil;
        this.userService = userService;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            // Récupérer le JWT du header Authorization
            String jwt = extractJwtFromRequest(request);
            if (jwt == null ) {
                filterChain.doFilter(request, response);
                return;
            }
            if (StringUtils.hasText(jwt) && jwtUtils.validateJwtToken(jwt)) {
                // Extraire l'identifiant de l'utilisateur du JWT
                String email = jwtUtils.getEmailFromJwtToken(jwt);

                // Charger les détails de l'utilisateur à partir de la base de données
                UserDetails userDetails = userService.loadUserByUsername(email);

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            logger.error("Cannot set user authentication: {}", e);
        }

        filterChain.doFilter(request, response);
    }

    private String extractJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
