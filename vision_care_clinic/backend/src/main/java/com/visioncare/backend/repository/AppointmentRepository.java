package com.visioncare.backend.repository;

import com.visioncare.backend.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List; // <-- 1. IMPORT LIST

/**
 * This is a Spring Data JPA Repository.
 *
 * By extending JpaRepository, this interface automatically gets all the
 * standard database commands:
 * - save()
 * - findById()
 * - findAll()
 * - delete()
 * ...and many more.
 *
 * We tell it two things in the brackets <...>:
 * 1. Appointment: The entity (class) it manages.
 * 2. Long: The data type of the entity's Primary Key (@Id), which is 'Long'.
 *
 * @Repository tells Spring to manage this interface as a "Bean".
 */
@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // --- 2. THIS IS THE NEW CUSTOM QUERY ---
    /**
     * Spring Data JPA automatically creates this query for us based on the method name.
     * It finds all Appointment entities that are linked to a specific user's ID.
     * "User" refers to the 'user' field in Appointment.java
     * "Id" refers to the 'id' field in User.java
     * @param userId The ID of the user to search for.
     * @return A list of appointments for that user.
     */
    List<Appointment> findByUser_Id(Long userId);
}
