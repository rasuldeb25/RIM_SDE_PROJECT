package com.visioncare.appointments;

import com.visioncare.patients.Patient;
import com.visioncare.doctors.Doctor;
import jakarta.persistence.*;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Getter
@Setter
@NoArgsConstructor
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    @Pattern(regexp = "[0-9+\\-()\\s]{7,20}", message = "Invalid phone number")
    private String phone;

    @NotBlank
    private String date; // ISO yyyy-MM-dd

    @NotBlank
    private String time; // HH:mm

    @NotBlank
    private String service;

    private String notes;
    
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne  
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    private String status = "booked"; // booked, completed, cancelled

    private String reasonForVisit;

    @CreationTimestamp
    private LocalDateTime createdAt;
}


