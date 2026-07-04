-- =============================================================================
-- 1. MASSA DE DADOS PARA A TABELA 'incidents' (20 registros)
-- =============================================================================
INSERT INTO incidents (id, titulo, descricao, prioridade, status, responsavel_email) VALUES
('a1111111-1111-1111-1111-111111111111', 'Erro crítico no processamento de pagamento via Pix', 'O sistema apresenta timeout ao tentar confirmar transações com o banco central.', 'ALTA', 'ABERTA', 'joao.silva@viaappia.com'),
('a2222222-2222-2222-2222-222222222222', 'Lentidão ao carregar o dashboard de métricas', 'A tela inicial demora mais de 10 segundos para renderizar os gráficos.', 'MEDIA', 'EM_ANDAMENTO', 'maria.souza@viaappia.com'),
('a3333333-3333-3333-3333-333333333333', 'Falha na exportação de relatórios PDF', 'O botão de exportar gera um arquivo corrompido ou em branco para relatórios longos.', 'ALTA', 'ABERTA', 'carlos.lima@viaappia.com'),
('a4444444-4444-4444-4444-444444444444', 'Erro de digitação no rodapé da página institucional', 'Corrigir a palavra "Desenvolvido" que está escrita incorretamente.', 'BAIXA', 'RESOLVIDA', 'joao.silva@viaappia.com'),
('a5555555-5555-5555-5555-555555555555', 'Usuários reclamando de deslogar frequentemente', 'O token JWT parece expirar antes do tempo configurado de 1 hora.', 'ALTA', 'EM_ANDAMENTO', 'maria.souza@viaappia.com'),
('a6666666-6666-6666-6666-666666666666', 'Falta de contraste nos botões secundários', 'Acessibilidade: Os botões cinzas violam a diretriz WCAG de contraste mínimo.', 'BAIXA', 'ABERTA', 'ana.clara@viaappia.com'),
('a7777777-7777-7777-7777-777777777777', 'Vulnerabilidade apontada no SonarQube (Log Injection)', 'Corrigir os logs que estão concatenando inputs de usuários diretamente.', 'ALTA', 'EM_ANDAMENTO', 'carlos.lima@viaappia.com'),
('a8888888-8888-8888-8888-888888888888', 'Duplicação de cadastros no banco quando duplo clique', 'Se o usuário clicar duas vezes seguidas no botão Salvar, envia duas requisições.', 'MEDIA', 'ABERTA', 'joao.silva@viaappia.com'),
('a9999999-9999-9999-9999-999999999999', 'Integração com o provedor de e-mail falhando', 'Disparos de boas-vindas não estão chegando na caixa de entrada.', 'MEDIA', 'CANCELADA', 'ana.clara@viaappia.com'),
('b1111111-1111-1111-1111-111111111111', 'Erro 500 ao carregar histórico de comentários', 'Ocorre apenas quando o incidente possui mais de 15 comentários anexados.', 'ALTA', 'EM_ANDAMENTO', 'maria.souza@viaappia.com'),
('b2222222-2222-2222-2222-222222222222', 'Atualizar biblioteca de componentes UI do Angular', 'Mudar da versão 16 para a versão 16.2 para correções de segurança.', 'BAIXA', 'ABERTA', 'ana.clara@viaappia.com'),
('b3333333-3333-3333-3333-333333333333', 'Layout quebrado em dispositivos mobile (iPhone SE)', 'O menu lateral sobrepõe o conteúdo principal da tela em resoluções menores.', 'MEDIA', 'RESOLVIDA', 'joao.silva@viaappia.com'),
('b4444444-4444-4444-4444-444444444444', 'Estouro de memória no microsserviço de busca', 'O serviço cai ao buscar por palavras com caracteres especiais repetidos.', 'ALTA', 'ABERTA', 'carlos.lima@viaappia.com'),
('b5555555-5555-5555-5555-555555555555', 'Documentação da API desatualizada no Swagger', 'Faltam os novos campos adicionados na entidade de ocorrências.', 'BAIXA', 'RESOLVIDA', 'maria.souza@viaappia.com'),
('b6666666-6666-6666-6666-666666666666', 'Mecanismo de recuperação de senha dando erro', 'O link enviado para o e-mail do usuário redireciona para uma página 404.', 'ALTA', 'ABERTA', 'joao.silva@viaappia.com'),
('b7777777-7777-7777-7777-777777777777', 'Filtro por intervalo de datas trazendo resultados errados', 'Problema relacionado ao fuso horário (Timezone UTC vs Local).', 'MEDIA', 'EM_ANDAMENTO', 'carlos.lima@viaappia.com'),
('b8888888-8888-8888-8888-888888888888', 'Aviso de cookies cobrindo botão importante', 'O banner da LGPD impossibilita o clique no botão de suporte em telas menores.', 'BAIXA', 'ABERTA', 'ana.clara@viaappia.com'),
('b9999999-9999-9999-9999-999999999999', 'Upload de anexo travando a aplicação', 'Arquivos acima de 5MB geram erro sem feedback visual amigável.', 'MEDIA', 'ABERTA', 'maria.souza@viaappia.com'),
('c1111111-1111-1111-1111-111111111111', 'Ambiente de Homologação fora do ar', 'O servidor AWS EC2 parou de responder após o último deploy automatizado.', 'ALTA', 'RESOLVIDA', 'carlos.lima@viaappia.com'),
('c2222222-2222-2222-2222-222222222222', 'Mudar cor do botão de exclusão para vermelho', 'Melhoria de UX para evitar que o usuário apague dados por engano.', 'BAIXA', 'ABERTA', 'ana.clara@viaappia.com');

-- =============================================================================
-- 2. MULTIPLAS TAGS PARA 10 INCIDENTES (10 registros selecionados)
-- =============================================================================
INSERT INTO incident_tags (incident_id, tag) VALUES
-- Incidente 1 (Pix)
('a1111111-1111-1111-1111-111111111111', 'financeiro'),
('a1111111-1111-1111-1111-111111111111', 'backend'),
('a1111111-1111-1111-1111-111111111111', 'urgente'),
-- Incidente 2 (Dashboard)
('a2222222-2222-2222-2222-222222222222', 'frontend'),
('a2222222-2222-2222-2222-222222222222', 'performance'),
-- Incidente 3 (PDF)
('a3333333-3333-3333-3333-333333333333', 'backend'),
('a3333333-3333-3333-3333-333333333333', 'relatorios'),
-- Incidente 5 (JWT)
('a5555555-5555-5555-5555-555555555555', 'seguranca'),
('a5555555-5555-5555-5555-555555555555', 'auth'),
-- Incidente 6 (Acessibilidade)
('a6666666-6666-6666-6666-666666666666', 'frontend'),
('a6666666-6666-6666-6666-666666666666', 'ux'),
('a6666666-6666-6666-6666-666666666666', 'acessibilidade'),
-- Incidente 7 (SonarQube)
('a7777777-7777-7777-7777-777777777777', 'seguranca'),
('a7777777-7777-7777-7777-777777777777', 'qualidade'),
-- Incidente 8 (Duplo clique)
('a8888888-8888-8888-8888-888888888888', 'frontend'),
('a8888888-8888-8888-8888-888888888888', 'bug'),
-- Incidente 10 (Erro 500 Comentários)
('b1111111-1111-1111-1111-111111111111', 'backend'),
('b1111111-1111-1111-1111-111111111111', 'bug'),
-- Incidente 13 (Estouro memória)
('b4444444-4444-4444-4444-444444444444', 'infra'),
('b4444444-4444-4444-4444-444444444444', 'backend'),
('b4444444-4444-4444-4444-444444444444', 'critico'),
-- Incidente 18 (Upload)
('b9999999-9999-9999-9999-999999999999', 'backend'),
('b9999999-9999-9999-9999-999999999999', 'upload');

-- =============================================================================
-- 3. 20 COMENTÁRIOS PARA 8 INCIDENTES SELECIONADOS (Total: 160 comentários)
-- Usamos uma função anônima do PL/pgSQL para não ter que digitar 160 linhas na mão.
-- =============================================================================
DO $$
DECLARE
    -- Lista de IDs dos 8 incidentes que receberão a thread longa de comentários
    incident_ids UUID[] := ARRAY[
        'a1111111-1111-1111-1111-111111111111'::UUID, -- Pix
        'a2222222-2222-2222-2222-222222222222'::UUID, -- Dashboard
        'a3333333-3333-3333-3333-333333333333'::UUID, -- PDF
        'a5555555-5555-5555-5555-555555555555'::UUID, -- JWT
        'a7777777-7777-7777-7777-777777777777'::UUID, -- Sonar
        'b1111111-1111-1111-1111-111111111111'::UUID, -- Erro 500
        'b4444444-4444-4444-4444-444444444444'::UUID, -- Estouro Memória
        'b9999999-9999-9999-9999-999999999999'::UUID  -- Upload
    ];
    inc_id UUID;
    i INT;
    autores VARCHAR[] := ARRAY['Carlos Silva', 'Suporte N2', 'Desenvolvedor Senior', 'Product Owner'];
BEGIN
    FOREACH inc_id IN ARRAY incident_ids LOOP
        FOR i IN 1..20 LOOP
            INSERT INTO comments (id, incident_id, autor, mensagem, data_criacao)
            VALUES (
                -- Gera um UUID pseudo-aleatório gerando texto baseado no laço
                md5(inc_id::text || i::text)::uuid,
                inc_id,
                autores[(i % 4) + 1], -- Alterna entre os autores da lista acima
                'Discussão técnica em andamento. Atualização de status e acompanhamento do log de auditoria, iteração número ' || i || '.',
                CURRENT_TIMESTAMP - (i || ' hours')::interval -- Cria uma linha do tempo realista mudando as horas passadas
            );
        END LOOP;
    END LOOP;
END $$;