package com.labpostgre.lab_postgre_spring.repository;
 
import com.labpostgre.lab_postgre_spring.models.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
import java.util.List;
 
@Repository
public interface ReceiptRepository extends JpaRepository<Receipt, Integer> {
 
    List<Receipt> findByUser_UserId(Integer userId);
}
