package io.github.guillemotclement.backend.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import java.security.Key;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
	// TODO: use env variable
	public static final String SECRET = "5367566859703373367639792F423F452848284D6251655468576D5A71347437";

	public String generateToken(String email){
		Map<String, Object> claims = new HashMap<>();
		return createToken(claims, email);
	}

	private String createToken(Map<String, Object> claims, String email) {
		return Jwts.builder()
			.setClaims(claims)
			.setSubject(email)
			.setIssuedAt(new Date())
			.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30))
			.signWith(getSignKey(), SignatureAlgorithm.HS256)
			.compact();
	}

	private Key getSignKey(){
		byte[] keyBytes = Decoders.BASE64.decode(SECRET);
		return Keys.hmacShaKeyFor(keyBytes);
	}
}
