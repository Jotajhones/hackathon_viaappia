package com.viaappia.api.Services;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.viaappia.api.entity.IncidentsEntity;
import com.viaappia.api.repository.IncidentsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IncidentsServices {

    private final IncidentsRepository ir;

    public Iterable<IncidentsEntity> findAll() {
        return this.ir.findAll();
    }

    public IncidentsEntity findById(UUID id) {
        return this.ir.findById(id)
            .orElseThrow(() -> new RuntimeException("Incidente não encontrado com o ID: " + id));
    }
}
