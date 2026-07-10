package com.viaappia.api.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.viaappia.api.Services.StatsService;
import com.viaappia.api.dto.StatsDTO;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@Tag(name = "Stats", description = "Endpoints para dados estatísticos e métricas")
@RequiredArgsConstructor
@RestController
@RequestMapping("/stats")
public class StatsController {

    private final StatsService services;

    @Operation(summary = "Obter estatísticas de incidentes", description = "Retorna um consolidado com os números e métricas gerais dos incidentes")
    @GetMapping("/incidents") 
    public ResponseEntity<StatsDTO> getIncidentsStats() {
        StatsDTO stats = this.services.getIncidentsStats();
        return ResponseEntity.ok(stats);
    }
}