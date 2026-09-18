package com.petcare.Petcare.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import com.petcare.Petcare.dto.RegisterRequest;
import com.petcare.Petcare.model.User;
import com.petcare.Petcare.service.UserService;
import com.petcare.Petcare.dto.AuthResponse;
import com.petcare.Petcare.dto.LoginRequest;

@RestController
@RequestMapping("/api/auth")
public class AuthController 
{
	private final UserService userService;

    public AuthController(UserService userService) 
    {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(
            @Valid 
            @RequestBody RegisterRequest request) {

        User user = userService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(user);
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request) {

        AuthResponse response =
                userService.login(request);

        return ResponseEntity.ok(response);
    }
}
