package com.petcare.Petcare.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.petcare.Petcare.dto.ProfileUpdateRequest;
import com.petcare.Petcare.model.User;
import com.petcare.Petcare.service.UserService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/profile")
public class ProfileController 
{
	private final UserService userService;

    public ProfileController(UserService userService) 
    {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<User> getProfile(
            Authentication authentication) 
    {
        User user = userService.getProfile(authentication.getName());

        return ResponseEntity.ok(user);
    }

    @PutMapping
    public ResponseEntity<User> updateProfile(
            @Valid @RequestBody
                ProfileUpdateRequest request,
            Authentication authentication) {

        User user = userService.updateProfile(
                authentication.getName(),
                request
        );

        return ResponseEntity.ok(user);
    }
}
