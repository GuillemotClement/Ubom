package io.github.guillemotclement.backend.dto.product;

import java.math.BigDecimal;

public record CreateProductRequestDTO (
  String name,
  String description,
  Long categoryId,
  BigDecimal amount
){}
