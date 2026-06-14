package com.lms.controller;

import com.lms.dto.CourseAllocationDto;
import com.lms.service.CourseAllocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/course-allocations")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CourseAllocationController {

    private final CourseAllocationService allocationService;

    @GetMapping
    public ResponseEntity<List<CourseAllocationDto.Response>> getAllAllocations() {
        return ResponseEntity.ok(allocationService.getAllAllocations());
    }

    @PostMapping
    public ResponseEntity<List<CourseAllocationDto.Response>> createAllocation(
            @RequestBody CourseAllocationDto.Request request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(allocationService.createAllocation(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAllocation(@PathVariable Long id) {
        allocationService.deleteAllocation(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/lecturers")
    public ResponseEntity<List<CourseAllocationDto.LecturerResponse>> getAllLecturers() {
        return ResponseEntity.ok(allocationService.getAllLecturers());
    }
}
