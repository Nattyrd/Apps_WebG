package com.labpostgre.lab_postgre_spring.services;

import com.labpostgre.lab_postgre_spring.dto.CategoryRequest;
import com.labpostgre.lab_postgre_spring.exceptions.ResourceNotFoundException;
import com.labpostgre.lab_postgre_spring.models.Category;
import com.labpostgre.lab_postgre_spring.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public Category createCategory(CategoryRequest request) {
        Category category = Category.builder()
                .name(request.name())
                .description(request.description())
                .build();

        return categoryRepository.save(category);
    }

    public Category readCategory(Integer id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada con id: " + id));
    }

    public List<Category> readAllCategories() {
        return categoryRepository.findAll();
    }

    public Category updateCategory(Integer id, CategoryRequest request) {
        Category category = readCategory(id);
        category.setName(request.name());
        category.setDescription(request.description());
        return categoryRepository.save(category);
    }

    public void deleteCategory(Integer id) {
        Category category = readCategory(id);
        categoryRepository.delete(category);
    }
}
