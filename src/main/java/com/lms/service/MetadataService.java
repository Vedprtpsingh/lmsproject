package com.lms.service;

import com.lms.dto.MetadataDto;
import com.lms.entity.Enums;
import com.lms.entity.ProgramCourse;
import com.lms.repository.ProgramCourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MetadataService {

    private final ProgramCourseRepository programCourseRepository;

    public MetadataDto getMetadata() {
        List<MetadataDto.CourseOption> availableCourses = programCourseRepository.findAll().stream()
                .collect(Collectors.toMap(
                        ProgramCourse::getCode,
                        course -> MetadataDto.CourseOption.builder()
                                .code(course.getCode())
                                .name(course.getName())
                                .build(),
                        (existing, replacement) -> existing,
                        LinkedHashMap::new
                ))
                .values().stream()
                .collect(Collectors.toList());

        return MetadataDto.builder()
                .programLevels(getProgramLevels())
                .courseTypes(getCourseTypes())
                .statuses(getStatuses())
                .centers(getCenters())
                .departments(getDepartments())
                .batches(getBatches())
                .sessions(getSessions())
                .semesters(getSemesters())
                .availableCourses(availableCourses)
                .build();
    }

    private List<String> getProgramLevels() {
        return List.of(Enums.ProgramLevel.values()).stream()
                .map(Enums.ProgramLevel::getDisplayName)
                .toList();
    }

    private List<String> getCourseTypes() {
        return List.of(Enums.CourseType.values()).stream()
                .map(Enums.CourseType::getDisplayName)
                .toList();
    }

    private List<String> getStatuses() {
        return List.of(Enums.Status.values()).stream()
                .map(Enums.Status::getDisplayName)
                .toList();
    }

    private List<String> getCenters() {
        return List.of(Enums.Center.values()).stream()
                .map(Enums.Center::getDisplayName)
                .toList();
    }

    private List<String> getDepartments() {
        return List.of(Enums.Department.values()).stream()
                .map(Enums.Department::getDisplayName)
                .toList();
    }

    private List<String> getBatches() {
        return List.of(Enums.Batch.values()).stream()
                .map(Enums.Batch::getDisplayName)
                .toList();
    }

    private List<String> getSessions() {
        return List.of("2024-2025", "2025-2026", "2026-2027");
    }

    private List<String> getSemesters() {
        return List.of(
                "1st Semester",
                "2nd Semester",
                "3rd Semester",
                "4th Semester",
                "5th Semester",
                "6th Semester",
                "7th Semester",
                "8th Semester"
        );
    }
}
