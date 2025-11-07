package com.visioncare.backend.model;

import jakarta.persistence.*;

/**
 * This is our Appointment Entity.
 */
@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String date;
    private String time;
    private String service;

    // 'dateOfBirth' field has been REMOVED from here.

    @Column(length = 1024)
    private String notes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;


    /**
     * JPA requires a no-argument constructor.
     */
    public Appointment() {
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
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public String getService() { return service; }
    public void setService(String service) { this.service = service; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    // The get/set methods for 'dateOfBirth' have been REMOVED.
}