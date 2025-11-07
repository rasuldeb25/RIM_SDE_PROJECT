package com.visioncare.backend.controller;

import com.visioncare.backend.model.Appointment;
import com.visioncare.backend.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity; // <-- 1. IMPORT RESPONSE ENTITY
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    /**
     * This endpoint is now SECURE.
     * It links the new appointment to the logged-in user.
     */
    @PostMapping("/book")
    public Appointment createAppointment(@RequestBody Appointment appointment, Principal principal) {
        return appointmentService.createAppointment(appointment, principal);
    }

    /**
     * This (public) method gets all appointments from the database (for admin/testing).
     */
    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    // --- 2. THIS IS THE NEW SECURE ENDPOINT ---
    /**
     * This endpoint gets all appointments for *only* the currently logged-in user.
     * It maps to: GET /api/appointments/me
     * Spring Security will pass the 'Principal' object because this is a secure endpoint.
     */
    @GetMapping("/me")
    public ResponseEntity<List<Appointment>> getMyAppointments(Principal principal) {
        // We call our new service method, passing the user's identity
        List<Appointment> appointments = appointmentService.getAppointmentsForUser(principal);

        // We return the list of appointments with a 200 OK status
        return ResponseEntity.ok(appointments);
    }
    // --- END OF NEW ENDPOINT ---
}
