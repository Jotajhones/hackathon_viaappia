package com.viaappia.api.dto;

import java.time.OffsetDateTime;
import java.util.UUID;

public record CommentResponseDTO(
    UUID id,
    UUID incidentId,
    String autor,
    String mensagem,
    OffsetDateTime dataCriacao
) {}