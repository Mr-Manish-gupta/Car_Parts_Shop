package com.carparts.security;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {



    private static final String SECRET_STRING = "9a76a8d8e76c12f453a2908f51a2345b678cd9ef01ab23cd45ef67ab89cd01ef";



    private final SecretKey jtwSecretKey = Keys.hmacShaKeyFor(SECRET_STRING.getBytes(StandardCharsets.UTF_8));


    private static  final long ACCESS_TOKEN_EXPIRATION = 864000000;
    private static final long REFRESH_TOKEN_EXPIRATION = 604800000;



    public String extractUsername(String token){
        return extractClaims(token , Claims::getSubject);
    }


    public  <T>  T extractClaims (String token, Function<Claims, T> claimsTFunction){
        final Claims claims = extractAllClaims(token);
        return claimsTFunction.apply(claims);
    }

    public String generateAccessToken (UserDetails userDetails){
        Map<String, Object> extractClaims = new HashMap<>();
        String role =
                userDetails.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");
        extractClaims.put("role", role);
        if (userDetails instanceof CustomUserDetails) {
            extractClaims.put("name", ((CustomUserDetails) userDetails).getUser().getName());
        }
        return createToken(extractClaims, userDetails.getUsername(), ACCESS_TOKEN_EXPIRATION);
    }

    public String generateRefreshToken (UserDetails userDetails){
        return createToken(new HashMap<>(), userDetails.getUsername(), REFRESH_TOKEN_EXPIRATION);
    }

    private String createToken (Map<String , Object> extraClaims, String subject, long expirationTime){
        return Jwts.builder()
                .claims(extraClaims)
                .subject(subject)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(jtwSecretKey)
                .compact();
    }

    public boolean isTokenValid (String  token , UserDetails userDetails){
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private Date extractExpiration (String  token) {
        return extractClaims(token, Claims::getExpiration);
    }
    private boolean isTokenExpired(String  token){
        return extractExpiration(token).before(new Date());
    }

    private  Claims extractAllClaims (String  token){
        return Jwts.parser()
                .verifyWith(jtwSecretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

}
