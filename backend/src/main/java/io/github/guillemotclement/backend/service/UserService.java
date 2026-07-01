package io.github.guillemotclement.backend.service;

import io.github.guillemotclement.backend.entity.User;
import io.github.guillemotclement.backend.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class UserService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;

	public UserService(
		UserRepository userRepository,
		PasswordEncoder passwordEncoder,
		JwtService jwtService
	) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
	}

	// definition des methodes metiers
	public User createUser(String username, String email, String password)
	{
		// validation
		if(userRepository.existsByUsername(username) || userRepository.existsByEmail(email)){
			throw new ResponseStatusException(
				HttpStatus.CONFLICT,
				"Username or Email already exists");
		}

		if(password.length() < 6){
			throw new ResponseStatusException(
				HttpStatus.BAD_REQUEST,
				"Password must be least 6 characters");
		}

		String hashedPassword = passwordEncoder.encode(password);

		User user = new User(username, email, hashedPassword);

		return userRepository.save(user);
	}

	public Optional<User> getUserByEmail(String email){
		return userRepository.getByEmail(email);
	}

	public boolean checkPassword(String password, String hashedPassword){
		return passwordEncoder.matches(password, hashedPassword);
	}

	public Long extractUserIdFromTokenJwt(String token){
		String email = jwtService.getEmailFromToken(token);

		Optional<User> user = this.getUserByEmail(email);
    if (user.isEmpty()) {
			System.out.println("User not found: " + email);
			throw new ResponseStatusException(
					HttpStatus.UNAUTHORIZED,
					"User not found"
			);
		}

		return user.get().getId();
	}
}
