package com.visioncare.backend.repository;

import com.visioncare.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * This is the Spring Data JPA Repository for our User entity.
 * It automatically gives us all the standard database commands.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * This is our first custom query.
     * Spring Data JPA is smart. By naming this method 'findByEmail',
     * it will automatically write the SQL query for us:
     * "SELECT * FROM users WHERE email = ?"
     *
     * @param email The email address to search for.
     * @return An 'Optional' User. 'Optional' is a safe way to handle
     * a result that might be null (if no user is found).
     */
    Optional<User> findByEmail(String email);
}