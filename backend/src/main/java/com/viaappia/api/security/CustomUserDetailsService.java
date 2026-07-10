package com.viaappia.api.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.viaappia.api.entity.UsersEntity;
import com.viaappia.api.repository.UsersRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    private final UsersRepository usersRepository;

    public CustomUserDetailsService(UsersRepository repository) {
        this.usersRepository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UsersEntity user = usersRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + username));
                
        return new UserDetailsImpl(user);
    }
}

