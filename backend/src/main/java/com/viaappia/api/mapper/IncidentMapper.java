package com.viaappia.api.mapper;

import org.springframework.stereotype.Component;

import com.viaappia.api.dto.IncidentsRequestDTO;
import com.viaappia.api.dto.IncidentResponseDTO;
import com.viaappia.api.entity.IncidentsEntity;

@Component
public class IncidentMapper {

    public IncidentsEntity toEntity(IncidentsRequestDTO dto) {
        if (dto == null) {
            return null;
        }
        
        IncidentsEntity entity = new IncidentsEntity();
        entity.setTitulo(dto.titulo());
        entity.setDescricao(dto.descricao());
        entity.setPrioridade(dto.prioridade());
        entity.setResponsavel(dto.responsavel());
        entity.setStatus(dto.status());
        
        if (dto.tags() != null) {
            entity.getTags().addAll(dto.tags());
        }
        
        return entity;
    }

    public IncidentResponseDTO toDTO(IncidentsEntity entity) {
        if (entity == null) {
            return null;
        }
        
        return new IncidentResponseDTO(
            entity.getId(),
            entity.getTitulo(),
            entity.getDescricao(),
            entity.getPrioridade(),
            entity.getResponsavel(),
            entity.getStatus(),
            entity.getTags(),
            entity.getDataAbertura(),
            entity.getDataAtualizacao()
        );
    }
}