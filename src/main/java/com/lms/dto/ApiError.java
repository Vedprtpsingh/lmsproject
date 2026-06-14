package com.lms.dto;

import java.time.Instant;
import java.util.List;

public record ApiError(
    String code,
    String message,
    Instant timestamp,
    List<String> details
) {}
