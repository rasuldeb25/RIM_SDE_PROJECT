package com.visioncare.backend.controller;

import com.visioncare.backend.model.User;
import com.visioncare.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

/**
 * This controller handles secure requests for user-specific data.
 * All endpoints in here will require a valid JWT.
 */
@RestController
@RequestMapping("/api/auth") // We'll add our new endpoint to the existing /api/auth path
public class UserController {

    @Autowired
    private UserRepository userRepository;

    /**
     * This is our new SECURE endpoint.
     * It maps to: GET /api/auth/me
     *
     * Spring Security will see the user's JWT token, validate it, and
     * automatically inject a 'Principal' (or 'Authentication') object
     * that contains the logged-in user's email (their 'name').
     */
    @GetMapping("/me")
    public ResponseEntity<User> getMyProfile(Principal principal) {
        // 'principal.getName()' will return the email of the logged-in user
        String email = principal.getName();

        // We find the user in the database
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        // We return the full User object as JSON
        // (Spring automatically hides the password)
        return ResponseEntity.ok(user);
    }

    /**
     * Update user profile including pet information
     * PUT /api/auth/profile
     */
    @PutMapping("/profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody User updatedUser, Principal principal) {
        try {
            String email = principal.getName();
            
            // Find the existing user
            User existingUser = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
            
            // Update only the allowed fields (don't update email, password, or ID)
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setPhone(updatedUser.getPhone());
            existingUser.setDateOfBirth(updatedUser.getDateOfBirth());
            
            // Update pet profile fields
            existingUser.setHasPet(updatedUser.getHasPet());
            existingUser.setPetType(updatedUser.getPetType());
            existingUser.setPetName(updatedUser.getPetName());
            existingUser.setPetFavoriteTreat(updatedUser.getPetFavoriteTreat());
            
            // Save the updated user
            User savedUser = userRepository.save(existingUser);
            
            return ResponseEntity.ok(savedUser);
            
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating profile");
        }
    }


}