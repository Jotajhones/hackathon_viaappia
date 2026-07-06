package com.viaappia.api.controllers;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.viaappia.api.Services.IncidentsServices;
import com.viaappia.api.dto.IncidentsRequestDTO;
import com.viaappia.api.dto.IncidentResponseDTO;
import com.viaappia.api.dto.IncidentStatusDTO;
import com.viaappia.api.entity.PrioridadeIncidents;
import com.viaappia.api.entity.StatusIncidents;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/incidents")
public class IncidentsController {

    private final IncidentsServices incidentsServices;

    @GetMapping("")
    public Page<IncidentResponseDTO> findAll(
            @RequestParam(required = false) StatusIncidents status,
            @RequestParam(required = false) PrioridadeIncidents prioridade,
            @RequestParam(required = false) String q,
            Pageable pageable) {

        return this.incidentsServices.findAllFiltered(status, prioridade, q, pageable);
    }

    @GetMapping("/{id}")
    public IncidentResponseDTO findById(@PathVariable UUID id) {
        return this.incidentsServices.findById(id);
    }

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public IncidentResponseDTO create(@RequestBody IncidentsRequestDTO incidentDto) {
        return this.incidentsServices.create(incidentDto);
    }

    @PutMapping("/{id}")
    public IncidentResponseDTO update(@PathVariable UUID id, @RequestBody IncidentsRequestDTO incidentDto) {
        return this.incidentsServices.update(id, incidentDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        this.incidentsServices.delete(id);
    }

    @PatchMapping("/{id}/status")
    public IncidentStatusDTO getStatus(@PathVariable UUID id) {
        return this.incidentsServices.findStatusById(id);
    }
}