package com.lms.controller;

import com.lms.dto.MetadataDto;
import com.lms.dto.MenuDto;
import com.lms.service.MetadataService;
import com.lms.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MetadataController {

    private final MetadataService metadataService;
    private final MenuService menuService;

    @GetMapping("/metadata")
    public ResponseEntity<MetadataDto> getMetadata() {
        return ResponseEntity.ok(metadataService.getMetadata());
    }

    @GetMapping("/menu")
    public ResponseEntity<MenuDto> getMenu() {
        return ResponseEntity.ok(menuService.getMenu());
    }
}
