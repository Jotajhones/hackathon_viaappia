package com.viaappia.api.dto;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import com.viaappia.api.entity.PrioridadeIncidents;
import com.viaappia.api.entity.StatusIncidents;

public record IncidentResponseDTO(
    UUID id,
    String titulo,
    String descricao,
    PrioridadeIncidents prioridade,
    String responsavel,
    StatusIncidents status,
    List<String> tags,
    OffsetDateTime dataAbertura,
    OffsetDateTime dataAtualizacao
) {}