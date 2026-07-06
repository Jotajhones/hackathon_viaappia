package com.viaappia.api.mapper;

import org.springframework.stereotype.Component;

import com.viaappia.api.dto.CommentsRequestDTO;
import com.viaappia.api.dto.CommentResponseDTO;
import com.viaappia.api.entity.CommentsEntity;

@Component
public class CommentsMapper {

    public CommentsEntity toEntity(CommentsRequestDTO dto) {
        if (dto == null) {
            return null;
        }
        
        CommentsEntity entity = new CommentsEntity();
        entity.setAutor(dto.autor());
        entity.setMensagem(dto.mensagem());
        
        return entity;
    }

    public CommentResponseDTO toDTO(CommentsEntity entity) {
        if (entity == null) {
            return null;
        }
        
        return new CommentResponseDTO(
            entity.getId(),
            entity.getIncident() != null ? entity.getIncident().getId() : null,
            entity.getAutor(),
            entity.getMensagem(),
            entity.getDataCriacao()
        );
    }
}