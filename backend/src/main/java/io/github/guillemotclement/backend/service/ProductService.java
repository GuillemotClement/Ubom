package io.github.guillemotclement.backend.service;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import io.github.guillemotclement.backend.entity.Product;
import io.github.guillemotclement.backend.entity.ProductPrice;
import io.github.guillemotclement.backend.entity.User;
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
    BigDecimal amount
  ){
    // GET USER =======================================================
    //récupération de user depuis le token ============================
    // TODO: extract recuperation userID
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if(authentication == null || !authentication.isAuthenticated()){
      throw new RuntimeException("User not authenticated");
    }
    // permet de recuperer le subject du token JWT
    String userEmail = authentication.getName();
    // =========================
    // recuperation de userID 
    Optional<User> user = userService.getUserByEmail(userEmail);
    if (user.isEmpty()) {
			System.out.println("User not found: " + userEmail);
			throw new ResponseStatusException(
					HttpStatus.UNAUTHORIZED,
					"User not found"
			);
		}

		Long userId = user.get().getId();

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
}
