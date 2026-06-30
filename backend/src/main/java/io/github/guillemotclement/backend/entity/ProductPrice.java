package io.github.guillemotclement.backend.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="product_price")
public class ProductPrice {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, precision = 10, scale = 2)
  BigDecimal amount;

  @Column(nullable = false, updatable = false, name="recorded_at")
  @CreationTimestamp
  private LocalDateTime recordedAt;

  @Column(nullable = true, name="deleted_at")
  private LocalDateTime deletedAt;

  @Column(nullable = false, name="product_id")
  private Long productId;

  // obligatoire
  public ProductPrice(){}

  public ProductPrice(BigDecimal amount, Long productId) {
    this.amount = amount;
    this.productId = productId;
  }

  public Long getId() {
    return id;
  }

  public BigDecimal getAmount() {
    return amount;
  }

  public LocalDateTime getRecordedAt() {
    return recordedAt;
  }

  public LocalDateTime getDeletedAt() {
    return deletedAt;
  }

  public void setDeletedAt(LocalDateTime deletedAt) {
    this.deletedAt = deletedAt;
  }

  public Long getProductId() {
    return productId;
  }
}
