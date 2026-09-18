package com.petcare.Petcare.config;

import java.io.IOException;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.petcare.Petcare.model.User;
import com.petcare.Petcare.repository.UserRepository;
import com.petcare.Petcare.security.JwtService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class OAuth2SuccessHandler
        implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    public OAuth2SuccessHandler(
            UserRepository userRepository,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication)
            throws IOException, ServletException {

        System.out.println(
                "GOOGLE OAUTH SUCCESS HANDLER CALLED"
        );

        OAuth2User oauthUser =
                (OAuth2User) authentication.getPrincipal();

        String email =
                oauthUser.getAttribute("email");

        String name =
                oauthUser.getAttribute("name");

        String picture =
                oauthUser.getAttribute("picture");

        System.out.println(
                "Google OAuth email received: " + email
        );

        if (email == null || email.isBlank()) {

            response.sendRedirect(
                    "http://localhost:5173/login?oauthError=true"
            );

            return;
        }

        Optional<User> existingUser =
                userRepository.findByEmail(email);

        User user;

        if (existingUser.isPresent()) {

            user = existingUser.get();

            if (user.getProfileImage() == null
                    || user.getProfileImage().isBlank()) {

                user.setProfileImage(picture);
            }

            userRepository.save(user);

        } else {

            user = new User();

            user.setName(
                    name != null && !name.isBlank()
                            ? name
                            : "Google User"
            );

            user.setEmail(email);

            user.setPassword(null);

            user.setProvider("GOOGLE");

            user.setProfileImage(picture);

            user = userRepository.save(user);
        }

        String token =
                jwtService.generateToken(
                        user.getEmail()
                );

        String redirectUrl =
                "http://localhost:5173/oauth-success"
                + "?token=" + token
                + "&userId=" + user.getId();

        System.out.println(
                "Redirecting Google user to React OAuth success page"
        );
        
        System.out.println(
                "JWT generated: " +
                (token != null && !token.isBlank())
        );

        System.out.println(
                "User ID: " + user.getId()
        );

        System.out.println(
                "Redirect target: http://localhost:5173/oauth-success"
        );

        response.sendRedirect(redirectUrl);
    }
}
