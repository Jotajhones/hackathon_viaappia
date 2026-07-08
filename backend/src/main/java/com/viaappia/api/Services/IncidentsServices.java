package com.viaappia.api.Services;

import java.time.OffsetDateTime;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.viaappia.api.dto.IncidentsRequestDTO;
import com.viaappia.api.dto.IncidentResponseDTO;
import com.viaappia.api.dto.IncidentStatusDTO;
import com.viaappia.api.entity.IncidentsEntity;
import com.viaappia.api.entity.PrioridadeIncidents;
import com.viaappia.api.entity.StatusIncidents;
import com.viaappia.api.mapper.IncidentMapper;
import com.viaappia.api.repository.IncidentsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IncidentsServices {

    private final IncidentsRepository incidentsRepository;
    private final IncidentMapper mapper;

    public Page<IncidentResponseDTO> findAllFiltered(StatusIncidents status, PrioridadeIncidents prioridade, String q,
            Pageable pageable) {
        String termoBusca = (q != null && !q.isBlank()) ? "%" + q.toLowerCase() + "%" : null;
        return this.incidentsRepository.findWithFilters(status, prioridade, termoBusca, pageable).map(mapper::toDTO);
    }

    public IncidentResponseDTO findById(UUID id) {
        IncidentsEntity entity = this.incidentsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Incidente não encontrado com o ID: " + id));
        return mapper.toDTO(entity);
    }

    public IncidentResponseDTO create(IncidentsRequestDTO incidentDto) {
        IncidentsEntity entity = mapper.toEntity(incidentDto);
        IncidentsEntity savedEntity = this.incidentsRepository.save(entity);
        return mapper.toDTO(savedEntity);
    }

    public IncidentResponseDTO update(UUID id, IncidentsRequestDTO incidentDto) {
        IncidentsEntity existingEntity = this.incidentsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Incidente não encontrado"));

        existingEntity.setTitulo(incidentDto.titulo());
        existingEntity.setDescricao(incidentDto.descricao());
        existingEntity.setPrioridade(incidentDto.prioridade());
        existingEntity.setStatus(incidentDto.status());
        existingEntity.setTags(incidentDto.tags());
        existingEntity.setResponsavel(incidentDto.responsavel());

        existingEntity.setDataAtualizacao(OffsetDateTime.now());

        IncidentsEntity updatedEntity = this.incidentsRepository.save(existingEntity);

        return mapper.toDTO(updatedEntity);
    }

    public void delete(UUID id) {
        IncidentsEntity existente = this.incidentsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Incidente não encontrado com o ID: " + id));
        this.incidentsRepository.delete(existente);
    }

    public IncidentStatusDTO findStatusById(UUID id) {
        return this.incidentsRepository.findIncidentById(id)
                .orElseThrow(() -> new RuntimeException("Incidente não encontrado"));
    }

}