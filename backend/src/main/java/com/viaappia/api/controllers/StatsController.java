package com.viaappia.api.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.viaappia.api.Services.StatsService;
import com.viaappia.api.dto.StatsDTO;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
@RestController
@RequestMapping("/stats")
public class StatsController {

    private final StatsService services;

    @GetMapping("/incidents") 
    public ResponseEntity<StatsDTO> getIncidentsStats() {
        StatsDTO stats = this.services.getIncidentsStats();
        return ResponseEntity.ok(stats);
    }
}
