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
public class MenuDto {

    private List<MenuItem> mainItems;
    private List<MenuItem> secondaryItems;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MenuItem {
        private String to;
        private String icon;
        private String label;
        private Boolean disabled;
        private List<String> activeOn;
    }
}
