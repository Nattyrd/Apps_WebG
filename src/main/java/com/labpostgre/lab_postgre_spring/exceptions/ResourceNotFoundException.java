package com.labpostgre.lab_postgre_spring.exceptions;

public class ResourceNotFoundException extends RuntimeException {
 
    public ResourceNotFoundException(String message) {
        super(message);
    }
}

