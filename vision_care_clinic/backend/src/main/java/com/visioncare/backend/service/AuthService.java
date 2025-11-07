package com.visioncare.backend.service;

import com.visioncare.backend.dto.LoginRequest;
import com.visioncare.backend.dto.RegisterRequest;
import com.visioncare.backend.model.User;
import com.visioncare.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * Logic for registering a new user.
     */
    public User register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        User newUser = new User();
        newUser.setFirstName(request.getFirstName());
        newUser.setLastName(request.getLastName());
        newUser.setEmail(request.getEmail());
        newUser.setPhone(request.getPhone());

        // --- 1. THIS IS THE NEW LINE ---
        // We now get the date of birth from the request and save it.
        newUser.setDateOfBirth(request.getDateOfBirth());
        // --- END OF NEW CODE ---

        String hashedPassword = passwordEncoder.encode(request.getPassword());
        newUser.setPassword(hashedPassword);

        return userRepository.save(newUser);
    }

    /**
     * 2. NEW METHOD: Logic for logging in a user
     */
    public String login(LoginRequest request) {
        // ... (login method remains unchanged)
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found after successful login. This should not happen."));

        return jwtService.generateToken(user);
    }
}