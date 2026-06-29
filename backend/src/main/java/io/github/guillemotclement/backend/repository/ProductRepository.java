package io.github.guillemotclement.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.guillemotclement.backend.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {}
