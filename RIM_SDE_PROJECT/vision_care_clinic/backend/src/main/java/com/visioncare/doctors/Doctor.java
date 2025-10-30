package com.visioncare.doctors;

import com.visioncare.departments.Department;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;

@Entity
@Table(name = "doctors")
@Getter
@Setter
@NoArgsConstructor
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long doctorId;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    private String specialization;

    private String phoneNumber;

    @Email
    private String email;

    private String roomNumber;

    private String availableDays; // Comma-separated: "Mon,Tue,Wed"

    private LocalTime availableTimeStart;

    private LocalTime availableTimeEnd;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;
}