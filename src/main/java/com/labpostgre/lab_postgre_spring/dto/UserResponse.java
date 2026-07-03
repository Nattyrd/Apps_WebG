package com.labpostgre.lab_postgre_spring.dto;

public record UserResponse(
        Integer userId,
        String firstName,
        String lastName,
        String email,
        String address,
        String phoneNumber
) {
}

