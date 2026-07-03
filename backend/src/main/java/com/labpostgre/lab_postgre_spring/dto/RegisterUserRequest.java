package com.labpostgre.lab_postgre_spring.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
 
public record RegisterUserRequest(
        @NotBlank String firstName,
        @NotBlank String lastName,
        @Email @NotBlank String email,
        @NotBlank String password,
        String address,
        String phoneNumber
) {
}

