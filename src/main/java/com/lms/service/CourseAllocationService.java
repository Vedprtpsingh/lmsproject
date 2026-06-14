package com.lms.service;

import com.lms.dto.CourseAllocationDto;
import com.lms.entity.CourseAllocation;
import com.lms.entity.Lecturer;
import com.lms.repository.CourseAllocationRepository;
import com.lms.repository.LecturerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseAllocationService {

    private final CourseAllocationRepository allocationRepository;
    private final LecturerRepository lecturerRepository;

    @Transactional(readOnly = true)
    public List<CourseAllocationDto.Response> getAllAllocations() {
        List<CourseAllocation> allocations = allocationRepository.findAll();

        // Group by lecturer, session, and batch
        Map<String, List<CourseAllocation>> grouped = allocations.stream()
                .collect(Collectors.groupingBy(a ->
                    a.getLecturer().getId() + "_" + a.getSession() + "_" + a.getBatch()
                ));

        List<CourseAllocationDto.Response> responses = new ArrayList<>();
        for (List<CourseAllocation> group : grouped.values()) {
            if (!group.isEmpty()) {
                CourseAllocation first = group.get(0);
                List<String> courses = group.stream()
                        .map(a -> a.getCourseCode() + " - " + a.getCourseName())
                        .collect(Collectors.toList());

                responses.add(CourseAllocationDto.Response.builder()
                        .id(first.getId())
                        .lecturerId(first.getLecturer().getId())
                        .lecturerName(first.getLecturer().getName())
                        .courses(courses)
                        .session(first.getSession())
                        .batch(first.getBatch())
                        .createdAt(first.getCreatedAt())
                        .build());
            }
        }
        return responses;
    }

    @Transactional
    public List<CourseAllocationDto.Response> createAllocation(CourseAllocationDto.Request request) {
        Lecturer lecturer = lecturerRepository.findById(request.getLecturerId())
                .orElseThrow(() -> new RuntimeException("Lecturer not found with id: " + request.getLecturerId()));

        List<CourseAllocation> allocations = new ArrayList<>();
        for (CourseAllocationDto.CourseInfo course : request.getCourses()) {
            CourseAllocation allocation = CourseAllocation.builder()
                    .lecturer(lecturer)
                    .courseCode(course.getCourseCode())
                    .courseName(course.getCourseName())
                    .session(request.getSession())
                    .batch(request.getBatch())
                    .build();
            allocations.add(allocation);
        }

        List<CourseAllocation> saved = allocationRepository.saveAll(allocations);

        // Group and return
        List<String> courses = saved.stream()
                .map(a -> a.getCourseCode() + " - " + a.getCourseName())
                .collect(Collectors.toList());

        CourseAllocationDto.Response response = CourseAllocationDto.Response.builder()
                .id(saved.get(0).getId())
                .lecturerId(lecturer.getId())
                .lecturerName(lecturer.getName())
                .courses(courses)
                .session(request.getSession())
                .batch(request.getBatch())
                .createdAt(saved.get(0).getCreatedAt())
                .build();

        return List.of(response);
    }

    @Transactional
    public void deleteAllocation(Long id) {
        if (!allocationRepository.existsById(id)) {
            throw new RuntimeException("Allocation not found with id: " + id);
        }
        allocationRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<CourseAllocationDto.LecturerResponse> getAllLecturers() {
        return lecturerRepository.findByStatus("Active").stream()
                .map(lecturer -> CourseAllocationDto.LecturerResponse.builder()
                        .id(lecturer.getId())
                        .name(lecturer.getName())
                        .email(lecturer.getEmail())
                        .department(lecturer.getDepartment())
                        .status(lecturer.getStatus())
                        .build())
                .collect(Collectors.toList());
    }
}
