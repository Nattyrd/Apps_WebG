package com.labpostgre.lab_postgre_spring.repository;

import com.labpostgre.lab_postgre_spring.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
