package io.github.guillemotclement.backend.dto;

public record LoginResponseDTO(
  Long id,
  String username,
  String email
) {
}
