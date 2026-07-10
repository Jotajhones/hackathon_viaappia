package com.viaappia.api.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.viaappia.api.entity.CommentsEntity;

public interface CommentsRepository extends JpaRepository<CommentsEntity, UUID> {

@Query("SELECT c FROM CommentsEntity c WHERE " +
        "c.incident.id = :incidentId AND " +
        "(:q IS NULL OR c.autor ILIKE %:q% OR c.mensagem ILIKE %:q%)")
Page<CommentsEntity> findByIncident_Id(
        @Param("incidentId") UUID incidentId,
        @Param("q") String q,
        Pageable pageable);
}