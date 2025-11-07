package com.visioncare.backend.dto;

// This class holds the data we send back to the frontend
public class LoginResponse {

    private String token;

    public LoginResponse(String token) {
        this.token = token;
    }

    // Getter
    public String getToken() {
        return token;
    }

    // Setter
    public void setToken(String token) {
        this.token = token;
    }
}