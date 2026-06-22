package io.github.guillemotclement.backend.controller;

import io.github.guillemotclement.backend.dto.UserDTO;
import io.github.guillemotclement.backend.entity.User;
import io.github.guillemotclement.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private final UserService userService; // contient l'injection de service

	// constructeur pour injecter la dépendance
	public UserController(UserService userService){
		this.userService = userService;
	}

	@PostMapping
	public ResponseEntity<User> createUser(@RequestBody UserDTO request)
	{
		User user = userService.createUser(
				request.username(),
				request.password(),
				request.email()
		);
		return ResponseEntity.ok(user);
	}
}

