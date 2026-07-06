package com.viaappia.api.controllers;

import org.springframework.data.domain.Pageable;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.viaappia.api.Services.CommentsServices;
import com.viaappia.api.dto.CommentsRequestDTO;
import com.viaappia.api.dto.CommentResponseDTO;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/incidents")
public class CommentsController {

    private final CommentsServices commentsServices;

    @GetMapping("/{incidentId}/comments")
    public Page<CommentResponseDTO> findByIncidentId(@PathVariable UUID incidentId, Pageable pageable) {
        return this.commentsServices.findByIncidentId(incidentId, pageable);
    }

    @PostMapping("/{incidentId}/comments")
    public CommentResponseDTO create(@RequestBody CommentsRequestDTO commentDto, @PathVariable UUID incidentId) {
        return this.commentsServices.create(commentDto, incidentId);
    }
}