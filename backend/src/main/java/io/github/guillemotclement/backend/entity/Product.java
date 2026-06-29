package io.github.guillemotclement.backend.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "product")
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String name;

  // par defaut VARCHAR 
  // avec annotation on passe sur un champ TEXT
  @Column(nullable = true, columnDefinition = "TEXT")
  private String description;

  // updatable = false => une fois créer on ne peut plus modifier
  @Column(nullable = false, updatable = false, name="created_at")
  // hibernate set automatiquement la date/heure a la creation
  @CreationTimestamp
  private LocalDateTime createdAt;

  @Column(nullable = true, name="updated_at")
  // hibernate met a jour automatiquement pour une modification
  @UpdateTimestamp
  private LocalDateTime updatedAt; 

  @Column(nullable = true, name="deleted_at")
  private LocalDateTime deletedAt;

  @Column(nullable = false, name="user_id")
  private Long userId;

  @Column(nullable = false, name="category_id")
  private Long categoryId;

  public Product(){}

  public Product(
    String name,
    String description,
    Long userId,
    Long categoryId
  ){
    this.name = name;
    this.description = description;
    this.userId = userId;
    this.categoryId = categoryId;
  }

  public Long getId(){
    return id;
  }

  public String getName(){
    return name;
  }

  public void setName(String name){
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }

  public LocalDateTime getDeletedAt() {
    return deletedAt;
  }

  public void setDeletedAt(LocalDateTime deletedAt) {
    this.deletedAt = deletedAt;
  }

  public Long getUserId() {
    return userId;
  }

  public Long getCategoryId() {
    return categoryId;
  }

  public void setCategoryId(Long categoryId) {
    this.categoryId = categoryId;
  }
}
