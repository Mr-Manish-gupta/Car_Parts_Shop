package com.carparts.service;


import com.carparts.dto.auth.LoginRequest;
import com.carparts.dto.auth.LoginResponse;
import com.carparts.dto.auth.RegisterRequest;
import com.carparts.entity.User;
import com.carparts.enums.Role;
import com.carparts.exception.BadRequestException;
import com.carparts.repository.UserRepository;
import com.carparts.security.CustomUserDetails;
import com.carparts.security.CustomUserDetailsService;
import com.carparts.security.JwtService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;



    @Transactional
    public String registerUser(RegisterRequest request){
        if(userRepository.existsByEmail(request.getEmail())){
            throw new BadRequestException("Email already exists");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhone())
                .role(Role.USER)
                .enabled(true)
                .build();

        userRepository.save(user);

        return "user Registered Successfully";
    }

    public LoginResponse login (LoginRequest request){
      try {
          authenticationManager.authenticate(
                  new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword())
          );
      }catch (Exception e){
          throw new BadRequestException(e.getMessage());
      }


        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow( () -> new BadRequestException("User not found"));

        CustomUserDetails userDetails = new CustomUserDetails(user);

        String accessToken = jwtService.generateAccessToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        return LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .role(user.getRole().name())
                .name(user.getName())
                .email(user.getEmail())
                .build();
    }
}
