package com.petcare.Petcare.security;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.petcare.Petcare.config.OAuth2SuccessHandler;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class SecurityConfig 
{
	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	
	public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter,
            OAuth2SuccessHandler oAuth2SuccessHandler) {

        this.jwtAuthenticationFilter =
                jwtAuthenticationFilter;
        
        this.oAuth2SuccessHandler =
                oAuth2SuccessHandler;
    }
	
	private final OAuth2SuccessHandler oAuth2SuccessHandler;
	
	@Bean
    public PasswordEncoder passwordEncoder() 
	{
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception 
    {

        http
        	.cors(Customizer.withDefaults())
        	
        	.csrf(csrf -> csrf.disable())
            
            .sessionManagement(session ->
            session.sessionCreationPolicy(
                SessionCreationPolicy.IF_REQUIRED
            		)
            )
            
            .exceptionHandling(exception ->
            exception.authenticationEntryPoint(
                (request, response, authException) -> {
	
	                    response.setStatus(
	                        HttpServletResponse.SC_UNAUTHORIZED
	                    );
	
	                    response.setContentType(
	                        "application/json"
	                    );
	
	                    response.getWriter().write(
	                        "{\"error\":\"Unauthorized\"}"
	                    );
	                }
	            )
	        )
            
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**",
                        "/oauth2/**",
                        "/login/oauth2/**").permitAll()
                .anyRequest().authenticated()
            )
            
            .oauth2Login(oauth ->
            oauth.successHandler(oAuth2SuccessHandler)
        )
        
            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}
