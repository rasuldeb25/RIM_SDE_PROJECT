package com.visioncare.backend.service;

import com.visioncare.backend.model.Appointment;
import com.visioncare.backend.model.User;
import com.visioncare.backend.repository.AppointmentRepository;
import com.visioncare.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.security.Principal;
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

        String email = principal.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        // --- 1. THIS IS THE NEW LOGIC ---
        // The form no longer sends email/phone, so we get them
        // from the logged-in user's profile and add them to the appointment.
        appointment.setEmail(user.getEmail());
        appointment.setPhone(user.getPhone());
        // --- END OF NEW LOGIC ---

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
        // --- 2. THIS IS THE FIX FOR THE JOKE-ERROR ---
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
        // --- END OF FIX ---

        // 3. Use our new repository method to find all appointments by this user's ID
        return appointmentRepository.findByUser_Id(user.getId());
    }
}