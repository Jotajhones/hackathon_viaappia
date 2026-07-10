package com.viaappia.api.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Pageable;
import java.util.UUID;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.viaappia.api.Services.CommentsServices;
import com.viaappia.api.dto.CommentsRequestDTO;
import com.viaappia.api.dto.CommentResponseDTO;

import lombok.RequiredArgsConstructor;

@Tag(name = "Comments", description = "Endpoints para gerenciamento de comentários nos incidentes")
@RequiredArgsConstructor
@RestController
@RequestMapping("/incidents")
public class CommentsController {

    private final CommentsServices commentsServices;

    @Operation(summary = "Listar comentários de um incidente", description = "Retorna uma lista paginada de comentários vinculados a um ID de incidente específico")
    @GetMapping("/{incidentId}/comments")
    @Cacheable(value = "comments")
    public Page<CommentResponseDTO> findByIncident_Id(
            @Parameter(description = "ID único do incidente") @PathVariable UUID incidentId,   
            @Parameter(description = "Termo de busca opcional") @RequestParam(required = false) String q,
            Pageable pageable) {
      
        return this.commentsServices.findByIncident_Id(incidentId, q, pageable);
    }

    @Operation(summary = "Adicionar comentário", description = "Cria um novo comentário para um incidente específico")
    @PostMapping("/{incidentId}/comments")
    @CacheEvict(value="comments", allEntries = true)
    public CommentResponseDTO create(
            @RequestBody CommentsRequestDTO commentDto, 
            @Parameter(description = "ID único do incidente") @PathVariable UUID incidentId) {
            
        return this.commentsServices.create(commentDto, incidentId);
    }
}