package com.visioncare.doctors;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findBySpecialization(String specialization);
    List<Doctor> findByDepartmentDepartmentId(Long departmentId);
}