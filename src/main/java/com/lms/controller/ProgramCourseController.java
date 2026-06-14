package com.lms.controller;

import com.lms.entity.Program;
import com.lms.entity.ProgramCourse;
import com.lms.repository.ProgramRepository;
import com.lms.repository.ProgramCourseRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/programs/{programId}/courses")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProgramCourseController {

    private final ProgramCourseRepository programCourseRepository;
    private final ProgramRepository programRepository;

    @GetMapping
    public ResponseEntity<List<CourseResponse>> getProgramCourses(@PathVariable Long programId) {
        List<ProgramCourse> courses = programCourseRepository.findByProgramId(programId);
        return ResponseEntity.ok(courses.stream()
                .map(this::toResponse)
                .collect(Collectors.toList()));
    }

    @PostMapping
    public ResponseEntity<CourseResponse> addCourse(
            @PathVariable Long programId,
            @RequestBody CourseRequest request) {

        Program program = programRepository.findById(programId)
                .orElseThrow(() -> new RuntimeException("Program not found"));

        ProgramCourse course = ProgramCourse.builder()
                .name(request.getName())
                .code(request.getCode())
                .credits(request.getCredits())
                .semester(request.getSemester())
                .type(request.getType())
                .description(request.getDescription())
                .status(request.getStatus())
                .program(program)
                .build();

        ProgramCourse saved = programCourseRepository.save(course);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(saved));
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long programId, @PathVariable Long courseId) {
        programCourseRepository.deleteById(courseId);
        return ResponseEntity.noContent().build();
    }

    private CourseResponse toResponse(ProgramCourse course) {
        return CourseResponse.builder()
                .id(course.getId())
                .name(course.getName())
                .code(course.getCode())
                .credits(course.getCredits())
                .semester(course.getSemester())
                .type(course.getType())
                .description(course.getDescription())
                .status(course.getStatus())
                .createdAt(course.getCreatedAt())
                .build();
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CourseRequest {
        @jakarta.validation.constraints.NotBlank(message = "Course name is required")
        @jakarta.validation.constraints.Size(max = 255, message = "Course name cannot exceed 255 characters")
        private String name;

        @jakarta.validation.constraints.NotBlank(message = "Course code is required")
        @jakarta.validation.constraints.Pattern(regexp = "^[A-Z0-9]{2,20}$",
                message = "Course code must be 2-20 uppercase letters/numbers")
        private String code;

        @jakarta.validation.constraints.NotNull(message = "Credits is required")
        @jakarta.validation.constraints.Min(value = 1, message = "Credits must be at least 1")
        @jakarta.validation.constraints.Max(value = 10, message = "Credits cannot exceed 10")
        private Integer credits;

        @jakarta.validation.constraints.NotBlank(message = "Semester is required")
        private String semester;

        @jakarta.validation.constraints.NotBlank(message = "Course type is required")
        @jakarta.validation.constraints.Pattern(regexp = "^(Core|Elective|Optional)$",
                message = "Type must be: Core, Elective, or Optional")
        private String type;

        @jakarta.validation.constraints.Size(max = 2000, message = "Description cannot exceed 2000 characters")
        private String description;

        @jakarta.validation.constraints.NotBlank(message = "Status is required")
        @jakarta.validation.constraints.Pattern(regexp = "^(Active|Inactive)$",
                message = "Status must be Active or Inactive")
        private String status;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CourseResponse {
        private Long id;
        private String name;
        private String code;
        private Integer credits;
        private String semester;
        private String type;
        private String description;
        private String status;
        private LocalDateTime createdAt;
    }
}
