package io.github.guillemotclement.backend.service;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
	// TODO: use env variable
	public static final String SECRET = "5367566859703373367639792F423F452848284D6251655468576D5A71347437";

	// TODO: mettre en place le refreshToken
	public String generateToken(String email) {
		return Jwts.builder()
			.subject(email)
			.issuedAt(new Date())
			// .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30)) // prod 30 min
			.expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7)) // 7 jours pour le dev
			.signWith(getSignKey())
			.compact();
	}

	public String getEmailFromToken(String token) {
		try {
			Claims claims = Jwts.parser()
				.verifyWith(getSignKey())
				.build()
				.parseSignedClaims(token)
				.getPayload();

			return claims.getSubject();
		} catch (Exception e) {
			throw new RuntimeException("Invalid token", e);
		}
	}

	private SecretKey getSignKey() {
		byte[] keyBytes = Decoders.BASE64.decode(SECRET);
		return Keys.hmacShaKeyFor(keyBytes);
	}
}
