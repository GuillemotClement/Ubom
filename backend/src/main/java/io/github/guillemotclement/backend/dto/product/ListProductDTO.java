package io.github.guillemotclement.backend.dto.product;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ListProductDTO (
  Long id,
  String name,
  String description,
  LocalDateTime createdAt,
  LocalDateTime updatedAt,
  String categoryName,
  BigDecimal amount
) {}
