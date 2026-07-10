-- 1. Inserindo Usuários com UUIDs explícitos
INSERT INTO users (id, username, password, role) VALUES 
('11111111-1111-1111-1111-111111111111', 'admin@projeto.com', crypt('123456', gen_salt('bf')), 'ROLE_ADMIN'),
('22222222-2222-2222-2222-222222222222', 'suporte@projeto.com', crypt('123456', gen_salt('bf')), 'ROLE_READ'),
('33333333-3333-3333-3333-333333333333', 'leitor@projeto.com', crypt('123456', gen_salt('bf')), 'ROLE_READ');

-- 2. Inserindo Incidentes
INSERT INTO incidents (id, titulo, descricao, prioridade, status, responsavel_email) VALUES 
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Servidor de banco de dados offline', 'O servidor principal parou de responder após a atualização do SO.', 'ALTA', 'EM_ANDAMENTO', 'suporte@projeto.com'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Erro na geração de relatórios', 'Usuários relatam timeout ao tentar exportar relatórios em PDF.', 'MEDIA', 'ABERTA', 'admin@projeto.com');

-- 3. Inserindo Tags
INSERT INTO incident_tags (incident_id, tag) VALUES 
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'database'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'downtime'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'bug'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'relatorios');

-- 4. Inserindo Comentários com UUIDs explícitos
INSERT INTO comments (id, incident_id, autor, mensagem) VALUES 
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'leitor@projeto.com', 'Alguma previsão de retorno? A equipe de vendas está parada.'),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'suporte@projeto.com', 'Estamos restaurando o snapshot de ontem. Previsão de 30 minutos.'),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'admin@projeto.com', 'Acompanhando. Me avise se precisar escalar para a AWS.'),

('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a41', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'leitor@projeto.com', 'Esse erro acontece apenas no período da tarde, quando há mais acessos.');