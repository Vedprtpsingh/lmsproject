package com.lms.repository;

import com.lms.entity.CourseAllocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CourseAllocationRepository extends JpaRepository<CourseAllocation, Long> {
    List<CourseAllocation> findByLecturerId(Long lecturerId);
    List<CourseAllocation> findBySession(String session);
    List<CourseAllocation> findBySemester(String semester);
    List<CourseAllocation> findByCourseCode(String courseCode);
}
