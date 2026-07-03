package com.labpostgre.lab_postgre_spring.controllers;

import com.labpostgre.lab_postgre_spring.dto.CategoryRequest;
import com.labpostgre.lab_postgre_spring.models.Category;
import com.labpostgre.lab_postgre_spring.services.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Category create(@Valid @RequestBody CategoryRequest request) {
        return categoryService.createCategory(request);
    }

    @GetMapping("/{id}")
    public Category read(@PathVariable Integer id) {
        return categoryService.readCategory(id);
    }

    @GetMapping
    public List<Category> readAll() {
        return categoryService.readAllCategories();
    }

    @PutMapping("/{id}")
    public Category update(@PathVariable Integer id,
                           @Valid @RequestBody CategoryRequest request) {
        return categoryService.updateCategory(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        categoryService.deleteCategory(id);
    }
}
