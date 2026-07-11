CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS pg_trgm; 

-- 1. Tabela de Usuários
CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('ROLE_ADMIN', 'ROLE_READ'))
);

-- 2. Tabela de Incidentes
CREATE TABLE incidents (
    id UUID PRIMARY KEY,
    titulo VARCHAR(120) NOT NULL,
    descricao VARCHAR(5000),
    prioridade VARCHAR(20) NOT NULL CHECK (prioridade IN ('BAIXA', 'MEDIA', 'ALTA')),
    status VARCHAR(20) NOT NULL CHECK (status IN ('ABERTA', 'EM_ANDAMENTO', 'RESOLVIDA', 'CANCELADA')),
    responsavel_email VARCHAR(255) NOT NULL,
    data_abertura TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Índices para buscas exatas
CREATE UNIQUE INDEX uk_incidents_titulo_lower ON incidents (LOWER(titulo));
CREATE INDEX idx_incidents_status ON incidents (status);
CREATE INDEX idx_incidents_prioridade ON incidents (prioridade);

-- Índices GIN para buscas textuais '%termo%'
CREATE INDEX idx_incidents_titulo_trgm ON incidents USING GIN (titulo gin_trgm_ops);
CREATE INDEX idx_incidents_descricao_trgm ON incidents USING GIN (descricao gin_trgm_ops);

-- 3. Tabela de Tags
CREATE TABLE incident_tags (
    incident_id UUID NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
    tag VARCHAR(50) NOT NULL
);

CREATE INDEX idx_incident_tags_incident_id ON incident_tags (incident_id);

-- 4. Tabela de Comentários
CREATE TABLE comments (
    id UUID PRIMARY KEY,
    incident_id UUID NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
    autor VARCHAR(255) NOT NULL,
    mensagem VARCHAR(2000) NOT NULL,
    data_criacao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_comments_incident_id ON comments (incident_id);

-- Índices GIN para busca nos comentários  '%termo%'
CREATE INDEX idx_comments_autor_trgm ON comments USING GIN (autor gin_trgm_ops);
CREATE INDEX idx_comments_mensagem_trgm ON comments USING GIN (mensagem gin_trgm_ops);