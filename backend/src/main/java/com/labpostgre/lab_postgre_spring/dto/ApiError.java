package com.labpostgre.lab_postgre_spring.dto;

import java.time.LocalDateTime;
 
public record ApiError(
        LocalDateTime timestamp,
        Integer status,
        String error,
        String message,
        String path
) {
}

