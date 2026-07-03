package com.labpostgre.lab_postgre_spring.exceptions;

public class InvalidCredentialsException extends RuntimeException {
 
    public InvalidCredentialsException() {
        super("Credenciales inválidas");
    }
}

