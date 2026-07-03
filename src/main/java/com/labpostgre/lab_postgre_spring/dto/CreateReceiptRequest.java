package com.labpostgre.lab_postgre_spring.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
 
import java.util.List;
 
public record CreateReceiptRequest(
        @NotNull Integer userId,
        @NotEmpty List<@Valid ReceiptItemRequest> items
) {
}
