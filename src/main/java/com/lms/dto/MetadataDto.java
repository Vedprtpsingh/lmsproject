package com.lms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MetadataDto {

    private List<String> programLevels;
    private List<String> courseTypes;
    private List<String> statuses;
    private List<String> centers;
    private List<String> departments;
    private List<String> batches;
    private List<String> sessions;
    private List<String> semesters;
    private List<CourseOption> availableCourses;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CourseOption {
        private String code;
        private String name;
    }
}
