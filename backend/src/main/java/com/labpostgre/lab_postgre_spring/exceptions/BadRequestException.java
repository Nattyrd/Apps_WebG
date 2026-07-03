package com.labpostgre.lab_postgre_spring.exceptions;

public class BadRequestException extends RuntimeException {
 
    public BadRequestException(String message) {
        super(message);
    }
}

