package io.github.guillemotclement.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.guillemotclement.backend.dto.product.CreateProductRequestDTO;
import io.github.guillemotclement.backend.dto.product.ListProductCategoryDTO;
import io.github.guillemotclement.backend.dto.product.ListProductDTO;
import io.github.guillemotclement.backend.entity.Product;
import io.github.guillemotclement.backend.entity.ProductCategory;
import io.github.guillemotclement.backend.repository.ProductCategoryRepository;
import io.github.guillemotclement.backend.service.JwtService;
import io.github.guillemotclement.backend.service.ProductService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/products")
public class ProductController {
  private final ProductService productService;
  private final ProductCategoryRepository productCategoryRepository;

  public ProductController(
    ProductService productService,
    ProductCategoryRepository productCategoryRepository,
    JwtService jwtService
  ){
    this.productService = productService;
    this.productCategoryRepository = productCategoryRepository;
  }

  @PostMapping
  public ResponseEntity<Product> createProduct(
    @RequestBody CreateProductRequestDTO request,
    @CookieValue("jwt") String token
  ) {
      Product product = productService.createProduct(
        request.name(), 
        request.description(), 
        request.categoryId(), 
        request.amount(),
        token
      );
      
      return ResponseEntity.status(HttpStatus.CREATED).body(product);
  }

  @GetMapping
  public ResponseEntity<List<ListProductDTO>> getUserActiveProducts(
    @CookieValue("jwt") String token
  ) {
      List<ListProductDTO> products = productService.getUserActiveProducts(token);
      return ResponseEntity.ok(products);
  }
  
  @GetMapping("/category")
  public ResponseEntity<List<ListProductCategoryDTO>> getProductCategory() {
    // appelle vers la methode qui recupere toutes les categories
    // c'est le DTO qui gere les données envoyer au front 
      List<ProductCategory> categories = productCategoryRepository.findAllActive();
      // .stream() => convertis la liste en stream pour traiter chaque éléments
      // .map() => transforme chqaue ProductCategory en objet qui respect le DTO 
      // .toList() => transforme le stream en liste finale qui sera envoyer au front 
      List<ListProductCategoryDTO> dtos = categories.stream()
        .map(category -> new ListProductCategoryDTO(
          category.getId(),
          category.getName()
        ))
        .toList();

      return ResponseEntity.ok(dtos);
  }
  
}
