package io.github.guillemotclement.backend.service;

import io.github.guillemotclement.backend.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class AuthService {
	private UserService userService;

	public AuthService(UserService userService){
		this.userService = userService;
	}

	public User checkUserCredential(String email, String password) {
		System.out.println("Login attempt for : " + email);

		Optional<User> user = userService.getUserByEmail(email);

		if (user.isEmpty()) {
			System.out.println("User not found: " + email);
			throw new ResponseStatusException(
					HttpStatus.UNAUTHORIZED,
					"Invalid credentials"
			);
		}

		// on vérifie si user existe, donc on peut recuperer les données retourner
		User existingUser = user.get();
		System.out.println("User found: " + existingUser.getEmail());

		boolean passwordValid = userService.checkPassword(password, existingUser.getPassword());
		System.out.println("Password valid: " + passwordValid);

		if (!passwordValid) {
			System.out.println("Invalid password");
			throw new ResponseStatusException(
					HttpStatus.UNAUTHORIZED,
					"Invalid credentials"
			);
		}
		return existingUser;
	}

}
