package com.viaappia.api.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.viaappia.api.dto.AuthRequestDTO;
import com.viaappia.api.dto.AuthResponseDTO;
import com.viaappia.api.security.JwtService;

@Tag(name = "Auth", description = "Endpoints para autenticação de usuários e geração de tokens")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;

    public AuthController(AuthenticationManager authenticationManager, 
                          UserDetailsService userDetailsService, 
                          JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtService = jwtService;
    }

    @Operation(summary = "Realizar login", description = "Autentica as credenciais do usuário e retorna um token JWT")
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody AuthRequestDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        
        final String jwt = jwtService.generateToken(userDetails);
        
        return ResponseEntity.ok(new AuthResponseDTO(jwt));
    }
}