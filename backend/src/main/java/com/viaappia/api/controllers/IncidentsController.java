package com.viaappia.api.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.UUID;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
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

@Tag(name = "Incidents", description = "Endpoints para registro, atualização e consulta de incidentes")
@RequiredArgsConstructor
@RestController
@RequestMapping("/incidents")
public class IncidentsController {

    private final IncidentsServices incidentsServices;

    @Operation(summary = "Listar incidentes", description = "Retorna uma lista paginada de incidentes, permitindo filtros por status, prioridade e texto")
    @GetMapping("")
    @Cacheable(value = "incidents")
    public Page<IncidentResponseDTO> findAll(
            @Parameter(description = "Filtro por status do incidente") @RequestParam(required = false) StatusIncidents status,
            @Parameter(description = "Filtro por prioridade") @RequestParam(required = false) PrioridadeIncidents prioridade,
            @Parameter(description = "Termo de busca textual") @RequestParam(required = false) String q,
            Pageable pageable) {

        return this.incidentsServices.findAllFiltered(status, prioridade, q, pageable);
    }

    @Operation(summary = "Buscar incidente por ID", description = "Retorna os detalhes completos de um incidente a partir do seu ID")
    @GetMapping("/{id}")
    @Cacheable(value = "incidents")
    public IncidentResponseDTO findById(
            @Parameter(description = "ID único do incidente") @PathVariable UUID id) {
        return this.incidentsServices.findById(id);
    }

    @Operation(summary = "Criar incidente", description = "Registra um novo incidente no sistema")
    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    @CacheEvict(value = "incidents", allEntries = true)
    public IncidentResponseDTO create(@RequestBody IncidentsRequestDTO incidentDto) {
        return this.incidentsServices.create(incidentDto);
    }

    @Operation(summary = "Atualizar incidente", description = "Atualiza os dados de um incidente existente")
    @PutMapping("/{id}")
    @CacheEvict(value = "incidents", allEntries = true)
    public IncidentResponseDTO update(
            @Parameter(description = "ID único do incidente") @PathVariable UUID id, 
            @RequestBody IncidentsRequestDTO incidentDto) {
        return this.incidentsServices.update(id, incidentDto);
    }

    @Operation(summary = "Excluir incidente", description = "Remove permanentemente um incidente do sistema")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @CacheEvict(value = "incidents", allEntries = true)
    public void delete(
            @Parameter(description = "ID único do incidente") @PathVariable UUID id) {
        this.incidentsServices.delete(id);
    }

    @Operation(summary = "Consultar status de incidente", description = "Retorna exclusivamente o status atual do incidente informado")
    @PatchMapping("/{id}/status")
    @CacheEvict(value = "incidents", allEntries = true)
    public IncidentStatusDTO getStatus(
            @Parameter(description = "ID único do incidente") @PathVariable UUID id) {
        return this.incidentsServices.findStatusById(id);
    }
}