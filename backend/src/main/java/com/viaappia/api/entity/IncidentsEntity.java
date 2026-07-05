package com.viaappia.api.entity;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "incidents")
public class IncidentsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String titulo;
    private String descricao;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PrioridadeIncidents prioridade;

    @Column(name = "responsavel_email", nullable = false)
    private String responsavel;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusIncidents status;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "incident_tags",joinColumns = @JoinColumn(name = "incident_id"))
    @Column(name = "tag", nullable = false)
    private List<String> tags = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "data_abertura", updatable = false, nullable = false)
    private OffsetDateTime dataAbertura;

    @UpdateTimestamp
    @Column(name = "data_atualizacao", nullable = false)
    private OffsetDateTime dataAtualizacao;
}

