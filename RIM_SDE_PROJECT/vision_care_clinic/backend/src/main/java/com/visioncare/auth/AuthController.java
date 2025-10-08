package com.visioncare.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    public record LoginRequest(@Email String email, @NotBlank String password) {}

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest request) {
        // Simple stub: accept any email/password and return a fake token
        return ResponseEntity.ok(Map.of(
                "token", "fake-jwt-token",
                "email", request.email()
        ));
    }
}


