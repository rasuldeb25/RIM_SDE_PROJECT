package com.visioncare.backend.controller;

import com.visioncare.backend.dto.LoginRequest; // <-- NEW
import com.visioncare.backend.dto.LoginResponse; // <-- NEW
import com.visioncare.backend.dto.RegisterRequest;
import com.visioncare.backend.model.User;
import com.visioncare.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * Endpoint for POST /api/auth/register
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        try {
            User registeredUser = authService.register(registerRequest);
            return ResponseEntity.ok("User registered successfully!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * 2. NEW ENDPOINT: For POST /api/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            // AuthService.login() will check the password
            // and return a JWT if it's correct.
            String token = authService.login(loginRequest);

            // Send the token back to the frontend in a 200 OK response
            return ResponseEntity.ok(new LoginResponse(token));

        } catch (Exception e) {
            // If authentication fails, send a 401 Unauthorized
            return ResponseEntity.status(401).body("Error: Invalid email or password");
        }
    }
}