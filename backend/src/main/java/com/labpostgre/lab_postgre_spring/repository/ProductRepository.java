package com.labpostgre.lab_postgre_spring.repository;

import com.labpostgre.lab_postgre_spring.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
}
