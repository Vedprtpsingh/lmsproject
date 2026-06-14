package com.lms.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

public class ProgramDto {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        @NotBlank(message = "Program name is required")
        @Size(max = 255, message = "Program name cannot exceed 255 characters")
        private String name;

        @NotBlank(message = "Program code is required")
        @Pattern(regexp = "^[A-Z0-9]{2,10}$", message = "Program code must be 2-10 uppercase letters/numbers")
        private String code;

        @NotBlank(message = "Level is required")
        @Pattern(regexp = "^(PG Diploma|Advanced PG Diploma|Certificate Course|Short Term Course|Professional Course|Executive Program)$",
                 message = "Level must be valid C-DAC program type")
        private String level;

        @NotBlank(message = "Duration is required")
        @Size(max = 50, message = "Duration cannot exceed 50 characters")
        private String duration;

        @Size(max = 100, message = "Center name cannot exceed 100 characters")
        private String center; // C-DAC Center

        @Size(max = 100, message = "Department name cannot exceed 100 characters")
        private String department; // ACTS, ESDM, etc.

        @Size(max = 2000, message = "Description cannot exceed 2000 characters")
        private String description;

        @NotBlank(message = "Status is required")
        @Pattern(regexp = "^(Active|Inactive)$", message = "Status must be Active or Inactive")
        private String status;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Long id;
        private String name;
        private String code;
        private String level;
        private String duration;
        private String description;
        private String status;
        private String center;
        private String department;
        private Integer coursesCount;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }
}
