package com.lms.service;

import com.lms.dto.MenuDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuService {

    public MenuDto getMenu() {
        return MenuDto.builder()
                .mainItems(List.of(
                        MenuDto.MenuItem.builder()
                                .to("#")
                                .icon("fas fa-tachometer-alt")
                                .label("Dashboard")
                                .disabled(true)
                                .activeOn(List.of("/"))
                                .build(),
                        MenuDto.MenuItem.builder()
                                .to("#")
                                .icon("fas fa-home")
                                .label("Home")
                                .disabled(true)
                                .activeOn(List.of("/"))
                                .build(),
                        MenuDto.MenuItem.builder()
                                .to("#")
                                .icon("fas fa-user")
                                .label("Profile")
                                .disabled(true)
                                .activeOn(List.of("/profile"))
                                .build(),
                        MenuDto.MenuItem.builder()
                                .to("#")
                                .icon("fas fa-user-tie")
                                .label("Admin Panel")
                                .disabled(true)
                                .activeOn(List.of("/admin"))
                                .build(),
                        MenuDto.MenuItem.builder()
                                .to("#")
                                .icon("fas fa-chalkboard-teacher")
                                .label("Lecturers")
                                .disabled(true)
                                .activeOn(List.of("/lecturers"))
                                .build(),
                        MenuDto.MenuItem.builder()
                                .to("#")
                                .icon("fas fa-user-graduate")
                                .label("Students")
                                .disabled(true)
                                .activeOn(List.of("/students"))
                                .build(),
                        MenuDto.MenuItem.builder()
                                .to("/programs")
                                .icon("fas fa-book-open")
                                .label("Programs & Courses")
                                .disabled(false)
                                .activeOn(List.of("/programs"))
                                .build(),
                        MenuDto.MenuItem.builder()
                                .to("#")
                                .icon("fas fa-check-double")
                                .label("Complete Exams")
                                .disabled(true)
                                .activeOn(List.of("/exams"))
                                .build(),
                        MenuDto.MenuItem.builder()
                                .to("#")
                                .icon("fas fa-record-vinyl")
                                .label("Quiz Progress Rec")
                                .disabled(true)
                                .activeOn(List.of("/quiz-progress"))
                                .build(),
                        MenuDto.MenuItem.builder()
                                .to("/courses/allocate")
                                .icon("fas fa-tasks")
                                .label("Course Allocation")
                                .disabled(false)
                                .activeOn(List.of("/courses/allocate"))
                                .build(),
                        MenuDto.MenuItem.builder()
                                .to("#")
                                .icon("fas fa-calendar-week")
                                .label("Manage Session")
                                .disabled(true)
                                .activeOn(List.of("/sessions"))
                                .build(),
                        MenuDto.MenuItem.builder()
                                .to("#")
                                .icon("fas fa-calendar-alt")
                                .label("Manage Semester")
                                .disabled(true)
                                .activeOn(List.of("/semesters"))
                                .build()
                ))
                .secondaryItems(List.of(
                        MenuDto.MenuItem.builder()
                                .to("#")
                                .icon("fas fa-cogs")
                                .label("Account Setting")
                                .disabled(true)
                                .activeOn(List.of("/account"))
                                .build(),
                        MenuDto.MenuItem.builder()
                                .to("#")
                                .icon("fas fa-key")
                                .label("Change Password")
                                .disabled(true)
                                .activeOn(List.of("/change-password"))
                                .build()
                ))
                .build();
    }
}
