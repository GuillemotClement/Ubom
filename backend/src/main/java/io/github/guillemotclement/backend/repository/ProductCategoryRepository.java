package io.github.guillemotclement.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import io.github.guillemotclement.backend.entity.ProductCategory;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long>{
  @Query(value = "SELECT * FROM product_category WHERE deleted_at IS NULL", nativeQuery = true)
  List<ProductCategory> findAllActive();
}