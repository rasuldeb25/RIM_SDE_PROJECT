package com.visioncare.patients;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "patients")
@Getter
@Setter
@NoArgsConstructor
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long patientId;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    private String gender;

    private LocalDate dateOfBirth;

    @Pattern(regexp = "[0-9+\\-()\\s]{7,20}", message = "Invalid phone number")
    private String phoneNumber;

    @Email
    @NotBlank
    private String email;

    private String address;

    private String password; 

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}