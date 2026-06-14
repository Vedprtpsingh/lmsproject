package com.lms.service;

import com.lms.dto.ProgramDto;
import com.lms.entity.Program;
import com.lms.repository.ProgramRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProgramService {

    private final ProgramRepository programRepository;

    @Transactional(readOnly = true)
    public List<ProgramDto.Response> getAllPrograms() {
        return programRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProgramDto.Response getProgramById(Long id) {
        Program program = programRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Program not found with id: " + id));
        return toResponse(program);
    }

    @Transactional
    public ProgramDto.Response createProgram(ProgramDto.Request request) {
        Program program = Program.builder()
                .name(request.getName())
                .code(request.getCode())
                .level(request.getLevel())
                .duration(request.getDuration())
                .description(request.getDescription())
                .status(request.getStatus())
                .center(request.getCenter())
                .department(request.getDepartment())
                .build();

        Program saved = programRepository.save(program);
        return toResponse(saved);
    }

    @Transactional
    public ProgramDto.Response updateProgram(Long id, ProgramDto.Request request) {
        Program program = programRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Program not found with id: " + id));

        program.setName(request.getName());
        program.setCode(request.getCode());
        program.setLevel(request.getLevel());
        program.setDuration(request.getDuration());
        program.setDescription(request.getDescription());
        program.setStatus(request.getStatus());
        program.setCenter(request.getCenter());
        program.setDepartment(request.getDepartment());

        Program updated = programRepository.save(program);
        return toResponse(updated);
    }

    @Transactional
    public void deleteProgram(Long id) {
        if (!programRepository.existsById(id)) {
            throw new RuntimeException("Program not found with id: " + id);
        }
        programRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<ProgramDto.Response> searchPrograms(String query) {
        return programRepository.findByNameContainingIgnoreCaseOrCodeContainingIgnoreCase(query, query).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProgramDto.Response> getProgramsByLevel(String level) {
        return programRepository.findByLevel(level).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private ProgramDto.Response toResponse(Program program) {
        return ProgramDto.Response.builder()
                .id(program.getId())
                .name(program.getName())
                .code(program.getCode())
                .level(program.getLevel())
                .duration(program.getDuration())
                .description(program.getDescription())
                .status(program.getStatus())
                .center(program.getCenter())
                .department(program.getDepartment())
                .coursesCount(program.getCourses().size())
                .createdAt(program.getCreatedAt())
                .updatedAt(program.getUpdatedAt())
                .build();
    }
}
