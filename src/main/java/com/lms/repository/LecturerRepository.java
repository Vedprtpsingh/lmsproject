package com.lms.repository;

import com.lms.entity.Lecturer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface LecturerRepository extends JpaRepository<Lecturer, Long> {
    Optional<Lecturer> findByEmail(String email);
    List<Lecturer> findByStatus(String status);
    List<Lecturer> findByNameContainingIgnoreCase(String name);
}
