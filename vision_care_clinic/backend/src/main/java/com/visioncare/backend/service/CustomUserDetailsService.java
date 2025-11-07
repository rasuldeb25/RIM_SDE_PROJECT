package com.visioncare.backend.service;

import com.visioncare.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * This service is responsible for loading a user from the database
 * for Spring Security to authenticate.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    /**
     * This method is called by Spring Security when a user tries to log in.
     * @param email (Spring Security calls it 'username', but we are using email)
     * @return UserDetails object (our User class already implements this)
     * @throws UsernameNotFoundException
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // We use our new UserRepository to find the user by their email
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }
}