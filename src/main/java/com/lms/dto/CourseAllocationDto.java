package com.lms.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

public class CourseAllocationDto {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        @NotNull(message = "Lecturer ID is required")
        @Positive(message = "Lecturer ID must be positive")
        private Long lecturerId;

        @NotEmpty(message = "At least one course must be selected")
        @Valid
        private List<CourseInfo> courses;

        @NotBlank(message = "Session is required")
        @Pattern(regexp = "^\\d{4}-\\d{4}$", message = "Session must be in format YYYY-YYYY (e.g., 2024-2025)")
        private String session;

        @NotBlank(message = "Batch is required")
        @Pattern(regexp = "^(February Batch|August Batch|September Batch)$",
                 message = "Batch must be: February Batch, August Batch, or September Batch")
        private String batch;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CourseInfo {
        @NotBlank(message = "Course code is required")
        @Size(max = 20, message = "Course code cannot exceed 20 characters")
        private String courseCode;

        @NotBlank(message = "Course name is required")
        @Size(max = 255, message = "Course name cannot exceed 255 characters")
        private String courseName;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Long id;
        private Long lecturerId;
        private String lecturerName;
        private List<String> courses;
        private String session;
        private String batch;
        private LocalDateTime createdAt;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LecturerResponse {
        private Long id;
        private String name;
        private String email;
        private String department;
        private String status;
    }
}
