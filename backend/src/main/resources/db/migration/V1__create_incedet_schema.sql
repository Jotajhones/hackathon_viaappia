
CREATE TABLE incidents (
    id UUID PRIMARY KEY,
    titulo VARCHAR(120) NOT NULL,
    descricao VARCHAR(5000),
    prioridade VARCHAR(20) NOT NULL CHECK (prioridade IN ('BAIXA', 'MEDIA', 'ALTA')),
    status VARCHAR(30) NOT NULL CHECK (status IN ('ABERTA', 'EM_ANDAMENTO', 'RESOLVIDA', 'CANCELADA')),
    responsavel_email VARCHAR(255) NOT NULL,
    data_abertura TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX uk_incidents_titulo_lower ON incidents (LOWER(titulo));
CREATE INDEX idx_incidents_status ON incidents (status);
CREATE INDEX idx_incidents_prioridade ON incidents (prioridade);
CREATE INDEX idx_incidents_titulo ON incidents (titulo);

CREATE TABLE incident_tags (
    incident_id UUID NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
    tag VARCHAR(80) NOT NULL
);

CREATE INDEX idx_incident_tags_incident_id ON incident_tags (incident_id);

CREATE TABLE comments (
    id UUID PRIMARY KEY,
    incident_id UUID NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
    autor VARCHAR(120) NOT NULL,
    mensagem VARCHAR(2000) NOT NULL,
    data_criacao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_comments_incident_id ON comments (incident_id);