package io.github.guillemotclement.backend.service;

import io.github.guillemotclement.backend.entity.User;
import io.github.guillemotclement.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	// injection des dépendances
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	// definition des methodes metiers
	public User createUser(String username, String email, String password)
	{
		// validation
		if(userRepository.existsByUsername(username) || userRepository.existsByEmail(email)){
			throw new RuntimeException("Username or Email already exists");
		}

		if(password.length() < 6){
			throw new RuntimeException("Password must be least 6 characters");
		}

		String hashedPassword = passwordEncoder.encode(password);

		User user = new User(username, email, hashedPassword);

		return userRepository.save(user);
	}
}
