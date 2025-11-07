package com.visioncare.backend.service;

import com.visioncare.backend.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails; // Import UserDetails
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * This service is responsible for all JWT (token) operations:
 * 1. Generating a token
 * 2. Validating a token
 * 3. Extracting information (like username) from a token
 */
@Service
public class JwtService {

    // 1. A strong, secret key for signing the token.
    public static final String SECRET = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";

    /**
     * Generates a new JWT for a user.
     * @param user The user we are creating the token for.
     * @return A signed, unexpired JWT string.
     */
    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("firstName", user.getFirstName());

        return createToken(claims, user.getUsername()); // getUsername() is the email
    }

    /**
     * Helper method to create the token with an expiration date.
     */
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject) // The "subject" is the user (their email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                // --- THIS IS THE FIX ---
                // Changed from 10 hours to 24 hours (1000ms * 60s * 60m * 24h)
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                // --- END OF FIX ---
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Gets the secret signing key from our SECRET string.
     */
    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // --- Methods we will use LATER to VALIDATE the token ---

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}