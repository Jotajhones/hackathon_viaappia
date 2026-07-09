package com.viaappia.api.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.viaappia.api.entity.CommentsEntity;

public interface CommentsRepository extends JpaRepository<CommentsEntity, UUID> {
    Page <CommentsEntity> findByIncident_Id(UUID incidentId, Pageable pageable);

}
