package com.viaappia.api.Services;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.viaappia.api.entity.CommentsEntity;
import com.viaappia.api.entity.IncidentsEntity;
import com.viaappia.api.repository.CommentsRepository;
import com.viaappia.api.repository.IncidentsRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CommentsServices {

    private final CommentsRepository cr;
    private final IncidentsRepository ir;

    public Page<CommentsEntity> findByIncidentId(UUID incidentId, Pageable pageable) {
        return this.cr.findByIncidentId(incidentId, pageable);
    }

    public CommentsEntity create(CommentsEntity comment, UUID incidentId) {
        IncidentsEntity incident = ir.findById(incidentId)
                .orElseThrow(() -> new RuntimeException("Incidente não encontrado"));
        comment.setIncident(incident);
        
        return this.cr.save(comment);
    }
}
