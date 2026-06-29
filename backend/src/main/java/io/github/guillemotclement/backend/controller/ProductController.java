package io.github.guillemotclement.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.guillemotclement.backend.dto.product.CreateProductRequestDTO;
import io.github.guillemotclement.backend.entity.Product;
import io.github.guillemotclement.backend.service.ProductService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/products")
public class ProductController {
  private final ProductService productService;

  public ProductController(ProductService productService){
    this.productService = productService;
  }

  @PostMapping
  public ResponseEntity<Product> createProduct(@RequestBody CreateProductRequestDTO request) {
      Product product = productService.createProduct(
        request.name(), 
        request.description(), 
        request.categoryId(), 
        request.amount()
      );
      
      return ResponseEntity.ok(product);
  }
}
