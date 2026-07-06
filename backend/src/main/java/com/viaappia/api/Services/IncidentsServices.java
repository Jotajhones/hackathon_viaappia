package com.viaappia.api.Services;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.viaappia.api.dto.IncidentStatusDTO;
import com.viaappia.api.entity.IncidentsEntity;
import com.viaappia.api.entity.PrioridadeIncidents;
import com.viaappia.api.entity.StatusIncidents;
import com.viaappia.api.repository.IncidentsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IncidentsServices {

    private final IncidentsRepository ir;

    public Page<IncidentsEntity> findAllFiltered(StatusIncidents status, PrioridadeIncidents prioridade, String q,
            Pageable pageable) {
        String termoBusca = (q != null && !q.isBlank()) ? "%" + q.toLowerCase() + "%" : null;
        return this.ir.findWithFilters(status, prioridade, termoBusca, pageable);
    }

    public IncidentsEntity findById(UUID id) {
        return this.ir.findById(id)
                .orElseThrow(() -> new RuntimeException("Incidente não encontrado com o ID: " + id));
    }

    public IncidentsEntity create(IncidentsEntity incident) {
        return this.ir.save(incident);
    }

    public IncidentsEntity update(UUID id, IncidentsEntity incident) {
        incident.setId(id);
        return this.ir.save(incident);
    }

    public void delete(UUID id) {
        IncidentsEntity existente = findById(id);
        this.ir.delete(existente);
    }

    public IncidentStatusDTO findStatusById(UUID id) {
        return this.ir.findIncidentById(id)
                .orElseThrow(() -> new RuntimeException("Incidente não encontrado"));
    }

}
