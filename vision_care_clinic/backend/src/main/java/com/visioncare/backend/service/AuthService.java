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
import org.springframework.transaction.annotation.Transactional;

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

    /**
     * 3. NEW METHOD: Update user profile including pet information
     */
    @Transactional
    public User updateUserProfile(String email, User updatedUser) {
        User existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        // Update basic profile information
        if (updatedUser.getFirstName() != null) {
            existingUser.setFirstName(updatedUser.getFirstName());
        }
        if (updatedUser.getLastName() != null) {
            existingUser.setLastName(updatedUser.getLastName());
        }
        if (updatedUser.getPhone() != null) {
            existingUser.setPhone(updatedUser.getPhone());
        }
        if (updatedUser.getDateOfBirth() != null) {
            existingUser.setDateOfBirth(updatedUser.getDateOfBirth());
        }

        // Update pet profile information
        existingUser.setHasPet(updatedUser.getHasPet());
        if (updatedUser.getPetType() != null) {
            existingUser.setPetType(updatedUser.getPetType());
        }
        if (updatedUser.getPetName() != null) {
            existingUser.setPetName(updatedUser.getPetName());
        }
        if (updatedUser.getPetFavoriteTreat() != null) {
            existingUser.setPetFavoriteTreat(updatedUser.getPetFavoriteTreat());
        }

        return userRepository.save(existingUser);
    }

    /**
     * Alternative version: Update specific profile fields only
     */
    @Transactional
    public User updateUserProfile(String email, String firstName, String lastName, String phone, 
                                 String dateOfBirth, Boolean hasPet, String petType, 
                                 String petName, String petFavoriteTreat) {
        User existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        // Update fields if provided
        if (firstName != null) existingUser.setFirstName(firstName);
        if (lastName != null) existingUser.setLastName(lastName);
        if (phone != null) existingUser.setPhone(phone);
        if (dateOfBirth != null) existingUser.setDateOfBirth(dateOfBirth);
        
        // Pet fields
        existingUser.setHasPet(hasPet);
        if (petType != null) existingUser.setPetType(petType);
        if (petName != null) existingUser.setPetName(petName);
        if (petFavoriteTreat != null) existingUser.setPetFavoriteTreat(petFavoriteTreat);

        return userRepository.save(existingUser);
    }
}