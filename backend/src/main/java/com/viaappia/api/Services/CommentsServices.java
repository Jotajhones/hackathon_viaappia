package com.viaappia.api.Services;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.viaappia.api.dto.CommentsRequestDTO;
import com.viaappia.api.dto.CommentResponseDTO;
import com.viaappia.api.entity.CommentsEntity;
import com.viaappia.api.entity.IncidentsEntity;
import com.viaappia.api.mapper.CommentsMapper;
import com.viaappia.api.repository.CommentsRepository;
import com.viaappia.api.repository.IncidentsRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CommentsServices {

    private final CommentsRepository commentsRepository;
    private final IncidentsRepository incidentsRepository;
    private final CommentsMapper mapper;

    public Page<CommentResponseDTO> findByIncidentId(UUID incidentId, Pageable pageable) {
        return this.commentsRepository.findByIncidentId(incidentId, pageable).map(mapper::toDTO);
    }

    public CommentResponseDTO create(CommentsRequestDTO commentDto, UUID incidentId) {
        IncidentsEntity incident = incidentsRepository.findById(incidentId)
                .orElseThrow(() -> new RuntimeException("Incidente não encontrado"));
        
        CommentsEntity comment = mapper.toEntity(commentDto);
        comment.setIncident(incident);
        
        CommentsEntity savedComment = this.commentsRepository.save(comment);
        return mapper.toDTO(savedComment);
    }
}