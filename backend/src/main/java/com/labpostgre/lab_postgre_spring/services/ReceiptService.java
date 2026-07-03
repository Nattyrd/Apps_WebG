package com.labpostgre.lab_postgre_spring.services;
 
import com.labpostgre.lab_postgre_spring.dto.*;
import com.labpostgre.lab_postgre_spring.exceptions.BadRequestException;
import com.labpostgre.lab_postgre_spring.exceptions.ResourceNotFoundException;
import com.labpostgre.lab_postgre_spring.models.Product;
import com.labpostgre.lab_postgre_spring.models.Receipt;
import com.labpostgre.lab_postgre_spring.models.ReceiptItem;
import com.labpostgre.lab_postgre_spring.models.User;
import com.labpostgre.lab_postgre_spring.repository.ProductRepository;
import com.labpostgre.lab_postgre_spring.repository.ReceiptRepository;
import com.labpostgre.lab_postgre_spring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
 
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
 
@Service
@RequiredArgsConstructor
public class ReceiptService {
 
    private final ReceiptRepository receiptRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
 
    public ReceiptResponse createReceipt(CreateReceiptRequest request) {
        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + request.userId()));
 
        Receipt receipt = Receipt.builder()
                .user(user)
                .createdAt(LocalDateTime.now())
                .total(BigDecimal.ZERO)
                .amountOfItems(0)
                .items(new ArrayList<>())
                .build();
 
        BigDecimal total = BigDecimal.ZERO;
        int amountOfItems = 0;
 
        for (ReceiptItemRequest itemRequest : request.items()) {
            Product product = productRepository.findById(itemRequest.productId())
                    .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con id: " + itemRequest.productId()));
 
            if (product.getAmount() < itemRequest.quantity()) {
                throw new BadRequestException("Stock insuficiente para el producto: " + product.getName());
            }
 
            BigDecimal unitPrice = product.getPrice();
            BigDecimal subtotal = unitPrice.multiply(BigDecimal.valueOf(itemRequest.quantity()));
 
            ReceiptItem item = ReceiptItem.builder()
                    .receipt(receipt)
                    .product(product)
                    .quantity(itemRequest.quantity())
                    .unitPrice(unitPrice)
                    .subtotal(subtotal)
                    .build();
 
            receipt.getItems().add(item);
            product.setAmount(product.getAmount() - itemRequest.quantity());
            productRepository.save(product);
 
            total = total.add(subtotal);
            amountOfItems += itemRequest.quantity();
        }
 
        receipt.setTotal(total);
        receipt.setAmountOfItems(amountOfItems);
 
        Receipt savedReceipt = receiptRepository.save(receipt);
        return toResponse(savedReceipt);
    }
 
    public ReceiptResponse readReceipt(Integer id) {
        Receipt receipt = receiptRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recibo no encontrado con id: " + id));
        return toResponse(receipt);
    }
 
    public List<ReceiptResponse> getReceiptsByUser(Integer userId) {
        return receiptRepository.findByUser_UserId(userId)
                .stream()
                .map(this::toResponse)
                .toList();
    }
 
    public List<ReceiptResponse> getAllReceipts() {
        return receiptRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }
 
    public void deleteReceipt(Integer id) {
        Receipt receipt = receiptRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recibo no encontrado con id: " + id));
        receiptRepository.delete(receipt);
    }
 
    private ReceiptResponse toResponse(Receipt receipt) {
        List<ReceiptItemResponse> items = receipt.getItems()
                .stream()
                .map(item -> new ReceiptItemResponse(
                        item.getProduct().getProductId(),
                        item.getProduct().getName(),
                        item.getQuantity(),
                        item.getUnitPrice(),
                        item.getSubtotal()
                ))
                .toList();
 
        return new ReceiptResponse(
                receipt.getReceiptId(),
                receipt.getUser().getUserId(),
                receipt.getUser().getEmail(),
                receipt.getTotal(),
                receipt.getAmountOfItems(),
                receipt.getCreatedAt(),
                items
        );
    }
}
