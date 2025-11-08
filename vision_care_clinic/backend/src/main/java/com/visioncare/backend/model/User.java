package com.visioncare.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

/**
 * This is our User Entity.
 */
@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = true)
    private String phone;

    // --- 1. THIS IS THE NEW FIELD (MOVED FROM APPOINTMENT) ---
    @Column(nullable = true) // Set to true, as existing users won't have this.
    private String dateOfBirth;
    // --- END OF NEW CODE ---

    // --- 2. PET PROFILE FIELDS ---
    @Column(name = "has_pet", nullable = true)
    private Boolean hasPet;

    @Column(name = "pet_type", nullable = true)
    private String petType;

    @Column(name = "pet_name", nullable = true)
    private String petName;

    @Column(name = "favorite_treat", nullable = true)
    private String petFavoriteTreat;
    // --- END OF PET PROFILE FIELDS ---

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Appointment> appointments;

    // --- Constructors ---
    public User() {
    }

    // --- Getters and Setters ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public List<Appointment> getAppointments() { return appointments; }
    public void setAppointments(List<Appointment> appointments) { this.appointments = appointments; }

    // --- GETTERS/SETTERS FOR DATE OF BIRTH FIELD ---
    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    // --- GETTERS/SETTERS FOR PET PROFILE FIELDS ---
    public Boolean getHasPet() {
        return hasPet;
    }

    public void setHasPet(Boolean hasPet) {
        this.hasPet = hasPet;
    }

    public String getPetType() {
        return petType;
    }

    public void setPetType(String petType) {
        this.petType = petType;
    }

    public String getPetName() {
        return petName;
    }

    public void setPetName(String petName) {
        this.petName = petName;
    }

    public String getPetFavoriteTreat() {
        return petFavoriteTreat;
    }

    public void setPetFavoriteTreat(String petFavoriteTreat) {
        this.petFavoriteTreat = petFavoriteTreat;
    }
    // --- END OF PET PROFILE GETTERS/SETTERS ---

    // --- UserDetails Interface Methods ---
    // (All the methods like getPassword(), getUsername(), isEnabled(), etc. are unchanged)

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}