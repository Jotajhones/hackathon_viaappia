package com.viaappia.api.dto;

import java.util.Map;

import com.viaappia.api.entity.PrioridadeIncidents;
import com.viaappia.api.entity.StatusIncidents;

public record StatsDTO(
    Map<StatusIncidents, Long> status,
    Map<PrioridadeIncidents, Long> prioridade,
    long ocorrencias
) {}