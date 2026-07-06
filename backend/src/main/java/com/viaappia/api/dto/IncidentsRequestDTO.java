package com.viaappia.api.dto;

import java.util.List;
import com.viaappia.api.entity.PrioridadeIncidents;
import com.viaappia.api.entity.StatusIncidents;

public record IncidentsRequestDTO(
    String titulo,
    String descricao,
    PrioridadeIncidents prioridade,
    String responsavel,
    StatusIncidents status,
    List<String> tags
) {}