package com.labpostgre.lab_postgre_spring.models;


 
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
 
import java.math.BigDecimal;

import com.labpostgre.lab_postgre_spring.models.Category;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Integer productId;
 
    @NotBlank
    @Column(name = "product_name", nullable = false)
    private String name;
 
    @DecimalMin(value = "0.01")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;
 
    private String description;
 
    @Min(0)
    @Column(nullable = false)
    private Integer amount;
 
    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
 
    private String imageUrl;
}

