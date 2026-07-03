package com.labpostgre.lab_postgre_spring.dto;

import com.labpostgre.lab_postgre_spring.models.Product;

import java.math.BigDecimal;

public record ProductResponse(
        Integer productId,
        String name,
        BigDecimal price,
        String description,
        Integer amount,
        CategoryResponse category,
        String imageUrl
) {
    public static ProductResponse from(Product product) {
        return new ProductResponse(
                product.getProductId(),
                product.getName(),
                product.getPrice(),
                product.getDescription(),
                product.getAmount(),
                CategoryResponse.from(product.getCategory()),
                product.getImageUrl()
        );
    }
}
