package com.visioncare.backend.service;

import com.visioncare.backend.model.Appointment;
import com.visioncare.backend.model.User;
import com.visioncare.backend.repository.AppointmentRepository;
import com.visioncare.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * This method links a new appointment to the logged-in user.
     * It now also copies the user's email and phone to the appointment.
     */
    public Appointment createAppointment(Appointment appointment, Principal principal) {
        // Validate required fields
        validateAppointment(appointment);
        
        String email = principal.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        // Set user information from logged-in user profile
        appointment.setEmail(user.getEmail());
        appointment.setPhone(user.getPhone());
        
        // This links the appointment to the user (e.g., for the dashboard)
        appointment.setUser(user);

        // This saves the completed appointment (now with email/phone) to the database
        return appointmentRepository.save(appointment);
    }

    /**
     * This method gets all appointments (for admin/testing).
     */
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    /**
     * This is the business logic for getting all appointments FOR A SPECIFIC USER.
     * @param principal The currently logged-in user.
     * @return A List of all Appointments belonging to that user.
     */
    public List<Appointment> getAppointmentsForUser(Principal principal) {
        // 1. Get the email of the logged-in user
        String email = principal.getName();

        // 2. Find the full User object from the database
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        // 3. Use our new repository method to find all appointments by this user's ID
        return appointmentRepository.findByUser_Id(user.getId());
    }

    /**
     * Validate appointment data before saving
     */
    private void validateAppointment(Appointment appointment) {
        if (appointment.getFirstName() == null || appointment.getFirstName().trim().isEmpty()) {
            throw new IllegalArgumentException("First name is required");
        }
        if (appointment.getLastName() == null || appointment.getLastName().trim().isEmpty()) {
            throw new IllegalArgumentException("Last name is required");
        }
        if (appointment.getDate() == null || appointment.getDate().trim().isEmpty()) {
            throw new IllegalArgumentException("Appointment date is required");
        }
        if (appointment.getTime() == null || appointment.getTime().trim().isEmpty()) {
            throw new IllegalArgumentException("Appointment time is required");
        }
        if (appointment.getService() == null || appointment.getService().trim().isEmpty()) {
            throw new IllegalArgumentException("Service type is required");
        }
        
        // Validate date format and ensure it's not in the past
        validateDate(appointment.getDate());
    }

    /**
     * Validate date string format and ensure it's not in the past
     */
    private void validateDate(String dateString) {
        try {
            // Parse the date string (expecting format: yyyy-MM-dd)
            LocalDate appointmentDate = LocalDate.parse(dateString);
            LocalDate today = LocalDate.now();
            
            // Check if date is in the past
            if (appointmentDate.isBefore(today)) {
                throw new IllegalArgumentException("Appointment date cannot be in the past");
            }
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Invalid date format. Please use YYYY-MM-DD format");
        }
    }
}