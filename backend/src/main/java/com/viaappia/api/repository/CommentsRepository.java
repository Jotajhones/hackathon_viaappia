package com.viaappia.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.viaappia.api.entity.CommentsEntity;

public interface CommentsRepository extends JpaRepository<CommentsEntity, UUID> {
}
