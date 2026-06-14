package com.lms.repository;

import com.lms.entity.ProgramCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProgramCourseRepository extends JpaRepository<ProgramCourse, Long> {
    Optional<ProgramCourse> findByCode(String code);
    List<ProgramCourse> findByProgramId(Long programId);
    List<ProgramCourse> findByStatus(String status);
    List<ProgramCourse> findByType(String type);
}
