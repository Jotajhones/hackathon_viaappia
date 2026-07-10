package com.viaappia.api.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail; // Nosso username é o email

        // 1. Verifica se o header existe e começa com "Bearer "
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return; // Passa direto para o próximo filtro (ex: rota de login que não tem token)
        }

        // 2. Extrai o token (pula os 7 caracteres de "Bearer ")
        jwt = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwt);

        // 3. Verifica se tem um email no token e se o usuário AINDA NÃO está
        // autenticado no contexto
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // Busca o usuário no banco usando a classe que criamos antes
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

            // 4. Se o token for válido...
            if (jwtService.isTokenValid(jwt, userDetails)) {

                // 5. Cria o crachá de acesso oficial do Spring Security
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Pendura o crachá no pescoço da requisição (salva no contexto)
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // 6. Manda a requisição seguir o fluxo normal para o Controller
        filterChain.doFilter(request, response);
    }
}
