package com.visioncare.backend.config;

import com.visioncare.backend.service.CustomUserDetailsService;
import com.visioncare.backend.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * This filter runs once per request. It intercepts all incoming requests,
 * checks for a JWT token, and validates it.
 */
@Component // Mark this as a Spring bean
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    /**
     * This is the main filter logic.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // 1. Get the Authorization header from the request
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        // 2. Check if the header is missing or doesn't start with "Bearer "
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response); // If no token, just continue the filter chain
            return;
        }

        // 3. Extract the token (the string after "Bearer ")
        jwt = authHeader.substring(7);

        // 4. Extract the user's email from the token
        userEmail = jwtService.extractUsername(jwt);

        // 5. Check if email is valid AND if the user is not already authenticated
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // 6. Load the user's details from the database
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

            // 7. Validate the token against the user details
            if (jwtService.validateToken(jwt, userDetails)) {

                // 8. If token is valid, create an "authentication" object
                // and set it in Spring Security's context.
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null, // We don't need credentials
                        userDetails.getAuthorities()
                );
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // This is the magic line that tells Spring Security "This user is logged in!"
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // 9. Continue the rest of the filter chain
        filterChain.doFilter(request, response);
    }
}