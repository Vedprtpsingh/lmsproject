package com.lms.exception;

import com.lms.dto.ApiError;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    ResponseEntity<ApiError> notFound(ResourceNotFoundException ex) { return error(HttpStatus.NOT_FOUND, "NOT_FOUND", ex.getMessage(), List.of()); }
    @ExceptionHandler(BadRequestException.class)
    ResponseEntity<ApiError> badRequest(BadRequestException ex) { return error(HttpStatus.BAD_REQUEST, "BAD_REQUEST", ex.getMessage(), List.of()); }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ApiError> validation(MethodArgumentNotValidException ex) {
        var details = ex.getBindingResult().getFieldErrors().stream().map(e -> e.getField() + ": " + e.getDefaultMessage()).toList();
        return error(HttpStatus.UNPROCESSABLE_ENTITY, "VALIDATION_ERROR", "Request validation failed", details);
    }
    @ExceptionHandler(Exception.class)
    ResponseEntity<ApiError> generic(Exception ex) { return error(HttpStatus.INTERNAL_SERVER_ERROR, "SERVER_ERROR", ex.getMessage(), List.of()); }
    private ResponseEntity<ApiError> error(HttpStatus status, String code, String message, List<String> details) {
        return ResponseEntity.status(status).body(new ApiError(code, message, Instant.now(), details));
    }
}
