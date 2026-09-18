package com.petcare.Petcare.service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.petcare.Petcare.dto.RegisterRequest;
import com.petcare.Petcare.model.User;
import com.petcare.Petcare.repository.UserRepository;
import com.petcare.Petcare.dto.AuthResponse;
import com.petcare.Petcare.dto.LoginRequest;
import com.petcare.Petcare.security.JwtService;
import com.petcare.Petcare.dto.ProfileUpdateRequest;

@Service
public class UserService 
{
	private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) 
    {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public User register(RegisterRequest request) 
    {

        if (userRepository.existsByEmail(request.getEmail())) 
        {
            throw new RuntimeException("Email is already registered");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setProvider("LOCAL");

        return userRepository.save(user);
    }
    
    public AuthResponse login(LoginRequest request) 
    {
        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(
                    () -> new RuntimeException(
                        "Invalid email or password"
                    )
                );

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        String token =
                jwtService.generateToken(user.getEmail());

        return new AuthResponse(
                token,
                "Bearer",
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }
    
    public User getProfile(String email) 
    {
        return userRepository
                .findByEmail(email)
                .orElseThrow(
                    () -> new RuntimeException(
                        "User not found"
                    )
                );
    }
    
    public User updateProfile(
            String currentEmail,
            ProfileUpdateRequest request) {

        User user = userRepository
                .findByEmail(currentEmail)
                .orElseThrow(
                    () -> new RuntimeException(
                        "User not found"
                    )
                );

        if (!user.getEmail().equals(request.getEmail())
                && userRepository.existsByEmail(request.getEmail())) {

            throw new RuntimeException(
                    "Email is already registered"
            );
        }

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setProfileImage(
                request.getProfileImage()
        );

        return userRepository.save(user);
    }
}
