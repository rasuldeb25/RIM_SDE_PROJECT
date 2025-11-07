package com.visioncare.backend.dto;

public class RegisterRequest {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;

    // --- 1. ADD NEW FIELD ---
    private String dateOfBirth;
    // --- END OF NEW CODE ---


    // Getters
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getPhone() { return phone; }

    // --- 2. ADD GETTER FOR NEW FIELD ---
    public String getDateOfBirth() {
        return dateOfBirth;
    }
    // --- END OF NEW CODE ---


    // Setters
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setPhone(String phone) { this.phone = phone; }

    // --- 3. ADD SETTER FOR NEW FIELD ---
    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
    // --- END OF NEW CODE ---
}