package io.github.guillemotclement.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.guillemotclement.backend.entity.ProductPrice;

public interface ProductPriceRepository extends JpaRepository<ProductPrice, Long> {}
