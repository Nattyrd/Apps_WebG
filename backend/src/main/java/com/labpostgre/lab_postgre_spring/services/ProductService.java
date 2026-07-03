package com.labpostgre.lab_postgre_spring.services;
 
import com.labpostgre.lab_postgre_spring.dto.ProductRequest;
import com.labpostgre.lab_postgre_spring.dto.ProductResponse;
import com.labpostgre.lab_postgre_spring.exceptions.ResourceNotFoundException;
import com.labpostgre.lab_postgre_spring.models.Category;
import com.labpostgre.lab_postgre_spring.models.Product;
import com.labpostgre.lab_postgre_spring.repository.CategoryRepository;
import com.labpostgre.lab_postgre_spring.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
 
import java.util.List;
 
@Service
@RequiredArgsConstructor
public class ProductService {
 
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
 
    public ProductResponse createProduct(ProductRequest request) {
        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada con id: " + request.categoryId()));
 
        Product product = Product.builder()
                .name(request.name())
                .price(request.price())
                .description(request.description())
                .amount(request.amount())
                .category(category)
                .imageUrl(request.imageUrl())
                .build();
 
        return ProductResponse.from(productRepository.save(product));
    }
 
    public ProductResponse readProduct(Integer id) {
        return ProductResponse.from(findProductEntity(id));
    }
 
    public List<ProductResponse> readAllProducts() {
        return productRepository.findAll().stream()
                .map(ProductResponse::from)
                .toList();
    }
 
    public ProductResponse updateProduct(Integer id, ProductRequest request) {
        Product product = findProductEntity(id);
 
        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada con id: " + request.categoryId()));
 
        product.setName(request.name());
        product.setPrice(request.price());
        product.setDescription(request.description());
        product.setAmount(request.amount());
        product.setCategory(category);
        product.setImageUrl(request.imageUrl());
 
        return ProductResponse.from(productRepository.save(product));
    }
 
    public void deleteProduct(Integer id) {
        Product product = findProductEntity(id);
        productRepository.delete(product);
    }
 
    public Product findProductEntity(Integer id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con id: " + id));
    }
}
