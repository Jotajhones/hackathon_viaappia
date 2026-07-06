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
import com.viaappia.api.dto.IncidentStatusDTO;
import com.viaappia.api.entity.IncidentsEntity;
import com.viaappia.api.entity.PrioridadeIncidents;
import com.viaappia.api.entity.StatusIncidents;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/incidents")
public class IncidentsController {

    private final IncidentsServices is;

    @GetMapping("")
    public Page<IncidentsEntity> findAll(
            @RequestParam(required = false) StatusIncidents status,
            @RequestParam(required = false) PrioridadeIncidents prioridade,
            @RequestParam(required = false) String q,
            Pageable pageable) {

        return this.is.findAllFiltered(status, prioridade, q, pageable);
    }

    @GetMapping("/{id}")
    public IncidentsEntity findById(@PathVariable UUID id) {
        return this.is.findById(id);
    }

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public IncidentsEntity create(@RequestBody IncidentsEntity incident) {
        return this.is.create(incident);
    }

    @PutMapping("/{id}")
    public IncidentsEntity update(@PathVariable UUID id, @RequestBody IncidentsEntity incident) {
        return this.is.update(id, incident);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        this.is.delete(id);
    }

    @PatchMapping("/{id}/status")
    public IncidentStatusDTO getStatus(@PathVariable UUID id) {
        return this.is.findStatusById(id);
    }
}
