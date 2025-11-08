package com.visioncare.backend.repository;

import com.visioncare.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    /**
     * Check if a user exists by email (useful for registration validation)
     */
    boolean existsByEmail(String email);

    /**
     * Custom update method for user profile without affecting password
     * This can be useful for partial updates
     */
    @Modifying
    @Query("UPDATE User u SET u.firstName = :firstName, u.lastName = :lastName, u.phone = :phone, " +
           "u.dateOfBirth = :dateOfBirth, u.hasPet = :hasPet, u.petType = :petType, " +
           "u.petName = :petName, u.petFavoriteTreat = :petFavoriteTreat WHERE u.email = :email")
    void updateUserProfile(@Param("email") String email,
                          @Param("firstName") String firstName,
                          @Param("lastName") String lastName,
                          @Param("phone") String phone,
                          @Param("dateOfBirth") String dateOfBirth,
                          @Param("hasPet") Boolean hasPet,
                          @Param("petType") String petType,
                          @Param("petName") String petName,
                          @Param("petFavoriteTreat") String petFavoriteTreat);

    /**
     * Alternative: Find by email for profile updates
     */
    Optional<User> findUserByEmail(String email);
}