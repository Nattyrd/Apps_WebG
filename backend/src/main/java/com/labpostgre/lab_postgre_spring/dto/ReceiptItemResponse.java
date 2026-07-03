package com.labpostgre.lab_postgre_spring.dto;

import java.math.BigDecimal;
 
public record ReceiptItemResponse(
        Integer productId,
        String productName,
        Integer quantity,
        BigDecimal unitPrice,
        BigDecimal subtotal
) {
}
