package com.petcare.Petcare.security;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;

@Service
public class JwtService 
{
	@Value("${jwt.secret}")
    private String secret;

    private static final long EXPIRATION_TIME =
            24 * 60 * 60 * 1000;

    private SecretKey getSigningKey() 
    {

        return Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8)
        );
    }

    public String generateToken(String email) 
    {

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                + EXPIRATION_TIME
                        )
                )
                .signWith(getSigningKey())
                .compact();
    }

    public String extractEmail(String token) 
    {
        return extractAllClaims(token)
                .getSubject();
    }

    public boolean isTokenValid(String token) 
    {
        try 
        {
            extractAllClaims(token);
            return true;
        } 
        catch (Exception e) 
        {
            return false;
        }
    }

    private Claims extractAllClaims(String token) 
    {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
