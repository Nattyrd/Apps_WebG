package com.labpostgre.lab_postgre_spring.repository;

 
import com.labpostgre.lab_postgre_spring.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
import java.util.Optional;
 
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
 
    Optional<User> findByEmail(String email);
 
    boolean existsByEmail(String email);
}
