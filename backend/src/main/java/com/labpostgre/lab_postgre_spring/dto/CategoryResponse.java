package com.labpostgre.lab_postgre_spring.dto;

import com.labpostgre.lab_postgre_spring.models.Category;

public record CategoryResponse(
        Integer categoryId,
        String name,
        String description
) {
    public static CategoryResponse from(Category category) {
        return new CategoryResponse(
                category.getCategoryId(),
                category.getName(),
                category.getDescription()
        );
    }
}
