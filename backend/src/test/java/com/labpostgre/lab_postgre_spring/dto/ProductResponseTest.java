package com.labpostgre.lab_postgre_spring.dto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.labpostgre.lab_postgre_spring.models.Category;
import com.labpostgre.lab_postgre_spring.models.Product;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class ProductResponseTest {

    @Test
    void shouldSerializeProductResponseWithoutCircularReferences() throws JsonProcessingException {
        Category category = Category.builder()
                .categoryId(1)
                .name("Electrónica")
                .description("Tecnología")
                .build();

        Product product = Product.builder()
                .productId(10)
                .name("Laptop")
                .price(new BigDecimal("999.99"))
                .description("Portátil")
                .amount(5)
                .category(category)
                .imageUrl("https://example.com/laptop.jpg")
                .build();

        ProductResponse response = ProductResponse.from(product);
        String json = new ObjectMapper().writeValueAsString(response);

        assertNotNull(response);
        assertEquals("Laptop", response.name());
        assertEquals("Electrónica", response.category().name());
        assertNotNull(json);
    }
}
