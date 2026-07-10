package com.viaappia.api.Services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.viaappia.api.dto.StatsDTO;
import com.viaappia.api.entity.PrioridadeIncidents;
import com.viaappia.api.entity.StatusIncidents;
import com.viaappia.api.repository.IncidentsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatsService {

    private final IncidentsRepository incidentRepository;

    public StatsDTO getIncidentsStats() {
        Map<StatusIncidents, Long> statusMap = new HashMap<>();
        for (StatusIncidents status : StatusIncidents.values()) {
            statusMap.put(status, incidentRepository.countByStatus(status));
        }

        Map<PrioridadeIncidents, Long> prioridadeMap = new HashMap<>();
        for (PrioridadeIncidents prioridade : PrioridadeIncidents.values()) {
            prioridadeMap.put(prioridade, incidentRepository.countByPrioridade(prioridade));
        }

        long total = incidentRepository.count();

        return new StatsDTO(statusMap, prioridadeMap, total);
    }
}
