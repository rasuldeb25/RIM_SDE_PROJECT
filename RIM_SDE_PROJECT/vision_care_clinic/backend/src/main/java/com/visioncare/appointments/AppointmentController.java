package com.visioncare.appointments;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;

    public AppointmentController(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @GetMapping
    public List<Appointment> list() {
        return appointmentRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Appointment> create(@RequestBody @Valid Appointment appointment) {
        Appointment saved = appointmentRepository.save(appointment);
        return ResponseEntity.created(URI.create("/api/appointments/" + saved.getId())).body(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> get(@PathVariable Long id) {
        return appointmentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}


