package io.github.guillemotclement.backend.dto;

// DTO - permet de sécuriser les donnes envoyer par le client
// spring map les mappe le JSON, creer une instance de la classe et rempli les champs avec les valeurs JSON
// les methode seront ensuite dispo sur Request
// record permet de generer directement le DTO (champ, setter et getter)
public record UserDTO(String username, String email, String password){}
