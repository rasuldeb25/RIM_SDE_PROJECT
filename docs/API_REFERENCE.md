# API Reference

This document provides a detailed reference for the Vision Care Clinic REST API.

Base URL: `http://localhost:8080` (default)

## Authentication

### Register User
Register a new user account.

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Auth Required**: No
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securePass",
    "firstName": "John",
    "lastName": "Doe"
  }
  ```
- **Response**:
  - `200 OK`: "User registered successfully!"
  - `400 Bad Request`: Error message.

### Login User
Authenticate a user and retrieve a JWT token.

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Auth Required**: No
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securePass"
  }
  ```
- **Response**:
  - `200 OK`:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1Ni..."
    }
    ```
  - `401 Unauthorized`: "Error: Invalid email or password"

### Get Current User Profile
Retrieve the profile of the currently logged-in user.

- **URL**: `/api/auth/me`
- **Method**: `GET`
- **Auth Required**: Yes (Bearer Token)
- **Response**:
  - `200 OK`:
    ```json
    {
      "id": 1,
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "phone": "1234567890",
      "hasPet": true,
      "petName": "Buddy",
      ...
    }
    ```

### Update User Profile
Update the profile of the currently logged-in user.

- **URL**: `/api/auth/profile`
- **Method**: `PUT`
- **Auth Required**: Yes (Bearer Token)
- **Body**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "phone": "0987654321",
    "dateOfBirth": "1990-01-01",
    "hasPet": false,
    "petType": "Dog",
    "petName": "Buddy",
    "petFavoriteTreat": "Bone"
  }
  ```
- **Response**:
  - `200 OK`: Updated User object.
  - `400 Bad Request`: Error message.

## Appointments

### Book Appointment
Book a new appointment for the authenticated user.

- **URL**: `/api/appointments/book`
- **Method**: `POST`
- **Auth Required**: Yes (Bearer Token)
- **Body**:
  ```json
  {
    "date": "2023-12-25T10:00:00",
    "reason": "Annual Checkup",
    "doctorName": "Dr. Smith"
  }
  ```
- **Response**:
  - `200 OK`: Created Appointment object.

### Get My Appointments
Retrieve all appointments for the currently logged-in user.

- **URL**: `/api/appointments/me`
- **Method**: `GET`
- **Auth Required**: Yes (Bearer Token)
- **Response**:
  - `200 OK`: List of Appointment objects.
    ```json
    [
      {
        "id": 1,
        "date": "2023-12-25T10:00:00",
        "reason": "Annual Checkup",
        "doctorName": "Dr. Smith"
      }
    ]
    ```

### Get All Appointments (Admin)
Retrieve all appointments in the system.

- **URL**: `/api/appointments`
- **Method**: `GET`
- **Auth Required**: No (Currently public, but typically restricted to Admin in prod)
- **Response**:
  - `200 OK`: List of all Appointment objects.
