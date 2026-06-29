package io.github.guillemotclement.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.guillemotclement.backend.dto.LoginDTO;
import io.github.guillemotclement.backend.dto.LoginResponseDTO;
import io.github.guillemotclement.backend.entity.User;
import io.github.guillemotclement.backend.service.AuthService;
import io.github.guillemotclement.backend.service.JwtService;

import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final AuthService authService;
  private final JwtService jwtService;

  public AuthController(AuthService authService, JwtService jwtService){
    this.authService = authService;
    this.jwtService = jwtService;
  }
  
  @PostMapping("/login")
  public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginDTO request) {
    User user = authService.checkUserCredential(request.email(), request.password());
    String token = jwtService.generateToken(user.getEmail());

    // permet l'envoie du cookie avec le token JWT en HttpOnly
    ResponseCookie cookie = ResponseCookie
      .from("jwt", token)
      .httpOnly(true)
      .secure(false) // for dev (true for prod)
      .path("/")
      .maxAge(3600)
      .sameSite("Lax") // Strict for prod / Lax for dev
      .build();

    LoginResponseDTO userResponse = new LoginResponseDTO(user.getId(), user.getUsername(), user.getEmail());

    return ResponseEntity.ok().header("Set-Cookie", cookie.toString()).body(userResponse);
  }
}
