# Vision Care Clinic - Backend

Spring Boot backend for appointments and simple auth, wired to the frontend form.

## Implemented
- Spring Boot app `com.visioncare.BackendApplication`
- CORS for `http://localhost:5173`
- H2 in-memory DB + JPA
- Appointments API:
  - Entity `Appointment` (firstName, lastName, email, phone, date, time, service, notes)
  - Repo `AppointmentRepository`
  - Controller: GET `/api/appointments`, POST `/api/appointments`, GET `/api/appointments/{id}`
- Auth stub: POST `/api/auth/login` returns a fake token
- Frontend wiring: `frontend/src/api/appointments.js` and `AppointmentForm.jsx`

## Prerequisites
- Java 17+
- Maven 3.9+
- Node.js LTS (only for running the frontend)

## Run
```powershell
cd C:\Users\RPC\Desktop\hospital_back_end\RIM_SDE_PROJECT\vision_care_clinic\backend
mvn spring-boot:run
```
- App: http://localhost:8080
- H2 Console: http://localhost:8080/h2-console (JDBC `jdbc:h2:mem:visioncare`, user `sa`, no password)

Build jar (optional):
```powershell
mvn clean package -DskipTests
java -jar target\vision-care-backend-0.0.1-SNAPSHOT.jar
```

## Test (PowerShell)
List appointments:
```powershell
curl.exe http://localhost:8080/api/appointments
```
Create appointment:
```powershell
$body = @{ firstName="Jane"; lastName="Doe"; email="jane@example.com"; phone="+1 555 123 4567"; date="2025-10-10"; time="09:00"; service="exam"; notes="First visit" } | ConvertTo-Json
Invoke-RestMethod -Method POST -Uri "http://localhost:8080/api/appointments" -ContentType "application/json" -Body $body
```
Login:
```powershell
$login = @{ email="jane@example.com"; password="secret" } | ConvertTo-Json
Invoke-RestMethod -Method POST -Uri "http://localhost:8080/api/auth/login" -ContentType "application/json" -Body $login
```

## Frontend (optional)
```powershell
cd C:\Users\RPC\Desktop\hospital_back_end\RIM_SDE_PROJECT\vision_care_clinic\frontend
npm.cmd install
npm.cmd run dev
```
Open http://localhost:5173 and submit the form; then `GET /api/appointments` will include the new record.
