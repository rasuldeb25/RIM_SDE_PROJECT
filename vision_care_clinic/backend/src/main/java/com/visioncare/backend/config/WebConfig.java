package com.visioncare.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * This class configures Cross-Origin Resource Sharing (CORS) for the application.
 * @Configuration tells Spring that this is a configuration class.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * This method adds the CORS mapping.
     * It tells our backend to trust our frontend.
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Apply this rule to all API endpoints
                .allowedOrigins("http://localhost:5173") // Trust requests from our React app
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow these HTTP methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow sending credentials (like cookies/auth tokens later)
    }
}