package com.viaappia.api.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.viaappia.api.entity.IncidentsEntity;
import com.viaappia.api.entity.PrioridadeIncidents;
import com.viaappia.api.entity.StatusIncidents;

public interface IncidentsRepository extends JpaRepository<IncidentsEntity, UUID> {

        @Query("SELECT i FROM IncidentsEntity i WHERE " +
                        "(:status IS NULL OR i.status = :status) AND " +
                        "(:prioridade IS NULL OR i.prioridade = :prioridade) AND " +
                        "(:q IS NULL OR LOWER(i.titulo) LIKE :q OR LOWER(i.descricao) LIKE :q)")
        Page<IncidentsEntity> findWithFilters(
                        @Param("status") StatusIncidents status,
                        @Param("prioridade") PrioridadeIncidents prioridade,
                        @Param("q") String q,
                        Pageable pageable);

}