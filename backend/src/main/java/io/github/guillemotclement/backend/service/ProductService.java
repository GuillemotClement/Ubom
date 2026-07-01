package io.github.guillemotclement.backend.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import io.github.guillemotclement.backend.dto.product.ListProductDTO;
import io.github.guillemotclement.backend.entity.Product;
import io.github.guillemotclement.backend.entity.ProductPrice;
import io.github.guillemotclement.backend.repository.ProductPriceRepository;
import io.github.guillemotclement.backend.repository.ProductRepository;
@Service
public class ProductService {
  private final ProductRepository productRepository;
  private final UserService userService;
  private final ProductPriceRepository productPriceRepository;

  public ProductService(
    ProductRepository productRepository,
    UserService userService,
    ProductPriceRepository productPriceRepository
  ){
    this.productRepository = productRepository;
    this.userService = userService;
    this.productPriceRepository = productPriceRepository;
  }

  public Product createProduct(
    String name, 
    String description, 
    Long categoryId, 
    BigDecimal amount,
    String token
  ){
		Long userId = userService.extractUserIdFromTokenJwt(token);

    // ENREGISTREMENT DU PRODUIT
    Product product = new Product(
      name,
      description,
      userId,
      categoryId
    );

    product = productRepository.save(product);

    // ENREGISTREMENT DU PRIX
    ProductPrice productPrice = new ProductPrice(amount, product.getId());
    
    productPriceRepository.save(productPrice);

    return product;    
  }

  public List<ListProductDTO> getUserActiveProducts(
    String token
  ){
    Long userId = userService.extractUserIdFromTokenJwt(token);
    return productRepository.findUserActiveProducts(userId);
  }
}
