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
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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

    @NotBlank(message = "O título é obrigatório")
    @Size(max = 120, message = "O título deve ter no máximo 120 caracteres")
    @Column(nullable = false, length = 120)
    private String titulo;

    @Size(max = 5000, message = "A descrição deve ter no máximo 5000 caracteres")
    @Column(length = 5000)
    private String descricao;

    @NotNull(message = "A prioridade é obrigatória")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PrioridadeIncidents prioridade;

    @Email(message = "Formato de e-mail inválido")
    @NotBlank(message = "O e-mail do responsável é obrigatório")
    @Size(max = 255)
    @Column(name = "responsavel_email", nullable = false)
    private String responsavel;

    @NotNull(message = "O status é obrigatório")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private StatusIncidents status;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "incident_tags", joinColumns = @JoinColumn(name = "incident_id"))
    @Column(name = "tag", nullable = false, length = 50)
    private List<String> tags = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "data_abertura", updatable = false, nullable = false)
    private OffsetDateTime dataAbertura;

    @UpdateTimestamp
    @Column(name = "data_atualizacao", nullable = false)
    private OffsetDateTime dataAtualizacao;
}

