# Backend Guide

This document outlines the architecture and development guidelines for the Vision Care Clinic backend application.

## Overview

The backend is a RESTful API built with:
- **Java 17**: Core language.
- **Spring Boot 3**: Framework for rapid application development.
- **Spring Security**: Authentication and access control.
- **Spring Data JPA**: Abstraction for database interactions.
- **PostgreSQL**: Relational database management system.

## Architecture

The application follows a standard layered architecture:

1.  **Controller Layer** (`com.visioncare.backend.controller`): Handles HTTP requests, maps endpoints, and returns responses.
2.  **Service Layer** (`com.visioncare.backend.service`): Contains business logic and transaction management.
3.  **Repository Layer** (`com.visioncare.backend.repository`): Interfaces extending `JpaRepository` for database CRUD operations.
4.  **Model/Entity Layer** (`com.visioncare.backend.model`): JPA Entities representing database tables.
5.  **DTO Layer** (`com.visioncare.backend.dto`): Data Transfer Objects for decoupled data exchange between frontend and backend.

## Security Flow

Authentication is stateless and uses JSON Web Tokens (JWT).

1.  **Login**: User sends credentials to `/api/auth/login`.
2.  **Verification**: `AuthService` verifies credentials using `AuthenticationManager`.
3.  **Token Generation**: If valid, a JWT is generated containing the user's email/identity.
4.  **Authorized Requests**: For subsequent requests, the frontend sends the JWT in the `Authorization` header (`Bearer <token>`).
5.  **Filter Chain**: A `JwtAuthenticationFilter` intercepts requests, validates the token, and sets the `SecurityContext` for the request.

## Database Schema

The core entities are:

### User (`users` table)
- `id`: Primary Key
- `email`: Unique identifier
- `password`: BCrypt hashed
- `firstName`, `lastName`: Personal info
- `phone`, `dateOfBirth`: Contact info
- `hasPet`, `petType`, `petName`, `petFavoriteTreat`: Extended profile data

### Appointment (`appointments` table)
- `id`: Primary Key
- `date`: Timestamp of appointment
- `reason`: Description
- `doctorName`: Assigned doctor
- `user_id`: Foreign key to `User`

## Configuration

Configuration is managed in `src/main/resources/application.properties`.

- **Database Connection**:
  ```properties
  spring.datasource.url=jdbc:postgresql://localhost:5432/visioncare
  spring.datasource.username=admin
  spring.datasource.password=password
  ```
- **JPA Settings**: `spring.jpa.hibernate.ddl-auto` controls schema generation (e.g., `update`).

## Adding a New Feature

To add a new feature (e.g., "Prescriptions"):

1.  **Model**: Create `Prescription.java` entity in `model` package.
2.  **Repository**: Create `PrescriptionRepository.java` interface.
3.  **Service**: Create `PrescriptionService.java` with business logic.
4.  **Controller**: Create `PrescriptionController.java` to expose REST endpoints.
5.  **DTO**: Create request/response DTOs if necessary.

## Running Tests

Run unit and integration tests using Maven:
```bash
./mvnw test
```
