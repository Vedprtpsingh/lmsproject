package com.lms.controller;

import com.lms.dto.ProgramDto;
import com.lms.service.ProgramService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/programs")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProgramController {

    private final ProgramService programService;

    @GetMapping
    public ResponseEntity<List<ProgramDto.Response>> getAllPrograms() {
        return ResponseEntity.ok(programService.getAllPrograms());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProgramDto.Response> getProgramById(@PathVariable Long id) {
        return ResponseEntity.ok(programService.getProgramById(id));
    }

    @PostMapping
    public ResponseEntity<ProgramDto.Response> createProgram(@RequestBody ProgramDto.Request request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(programService.createProgram(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProgramDto.Response> updateProgram(
            @PathVariable Long id,
            @RequestBody ProgramDto.Request request) {
        return ResponseEntity.ok(programService.updateProgram(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProgram(@PathVariable Long id) {
        programService.deleteProgram(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProgramDto.Response>> searchPrograms(@RequestParam String query) {
        return ResponseEntity.ok(programService.searchPrograms(query));
    }

    @GetMapping("/level/{level}")
    public ResponseEntity<List<ProgramDto.Response>> getProgramsByLevel(@PathVariable String level) {
        return ResponseEntity.ok(programService.getProgramsByLevel(level));
    }
}
