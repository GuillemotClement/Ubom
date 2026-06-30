package io.github.guillemotclement.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import io.github.guillemotclement.backend.dto.product.ListProductDTO;
import io.github.guillemotclement.backend.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
  // mappage automatique avec le DTO -> les champs doivent matcher les nom du DTO
  @Query(value = """
    SELECT 
      product.id AS id,
      product.name AS name,
      product.description AS description,
      product.created_at AS createdAt,
      product.updated_at AS updatedAt,
      product_category.name AS categoryName,
      product_price.amount AS amount   
    FROM product 
    LEFT JOIN product_category ON product.category_id = product_category.id 
    LEFT JOIN product_price ON product.id = product_price.product_id 
      AND product_price.recorded_at = (
        SELECT MAX(pp.recorded_at)
        FROM product_price pp 
        WHERE pp.product_id = product.id 
      )
    WHERE user_id = ?1 
    AND product.deleted_at IS NULL
      """, nativeQuery = true)
  List<ListProductDTO> findUserActiveProducts(Long userId);
  
}
