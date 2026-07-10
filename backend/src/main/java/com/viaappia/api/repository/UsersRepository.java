package com.viaappia.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.viaappia.api.entity.UsersEntity;

import java.util.Optional;
import java.util.UUID;

public interface UsersRepository extends JpaRepository<UsersEntity, UUID> {
    
    Optional<UsersEntity> findByUsername(String username);
    
}