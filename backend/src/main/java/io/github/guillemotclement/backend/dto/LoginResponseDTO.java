package io.github.guillemotclement.backend.dto;

import io.github.guillemotclement.backend.entity.User;

public record LoginResponseDTO(
  String token, 
  User user
) {
}
