package io.github.guillemotclement.backend.repository;

import io.github.guillemotclement.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// premier type correspond a l'entity du repository
// second type correspond a la cle primaire du l'entity
public interface UserRepository extends JpaRepository<User, Long> {
	// JpaRepository fournis des requetes de base
	// methode custom
	// optional represente une valeur qui peut ne pas exister
		Optional<User> getByUsername(String username);
		Optional<User> getByEmail(String email);
		boolean existsByUsername(String username);
		boolean existsByEmail(String email);
}
