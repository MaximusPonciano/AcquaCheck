-- ============================================================================
-- AcquaCheck: Operações CRUD (Create, Read, Update, Delete)
-- ============================================================================
-- Este arquivo contém exemplos práticos de operações básicas para cada tabela.
-- Os parâmetros são ilustrados usando marcadores ($1, $2, etc.) típicos do driver pg.
-- ============================================================================

-- ============================================================================
-- 1. TABELA: users
-- ============================================================================

-- CREATE: Inserir um novo usuário
INSERT INTO users (name, email, password, role)
VALUES ($1, $2, $3, $4)
RETURNING id, name, email, role;

-- READ: Listar todos os usuários
SELECT id, name, email, role 
FROM users 
ORDER BY name ASC;

-- READ: Buscar um usuário específico pelo ID
SELECT id, name, email, role 
FROM users 
WHERE id = $1;

-- READ: Buscar um usuário específico pelo e-mail (autenticação)
SELECT id, name, email, password, role 
FROM users 
WHERE email = $1;

-- UPDATE: Atualizar dados de perfil de um usuário
UPDATE users 
SET name = $1, email = $2, role = $3
WHERE id = $4
RETURNING id, name, email, role;

-- UPDATE: Atualizar a senha de um usuário
UPDATE users 
SET password = $1
WHERE id = $2;

-- DELETE: Excluir um usuário
DELETE FROM users 
WHERE id = $1;


-- ============================================================================
-- 2. TABELA: attractions
-- ============================================================================

-- CREATE: Inserir uma nova atração
INSERT INTO attractions (name, active)
VALUES ($1, $2)
RETURNING id, name, active;

-- READ: Listar todas as atrações
SELECT id, name, active 
FROM attractions 
ORDER BY name ASC;

-- READ: Listar apenas atrações ativas
SELECT id, name 
FROM attractions 
WHERE active = true 
ORDER BY name ASC;

-- READ: Buscar uma atração pelo ID
SELECT id, name, active 
FROM attractions 
WHERE id = $1;

-- UPDATE: Atualizar dados de uma atração (nome e status ativo)
UPDATE attractions 
SET name = $1, active = $2
WHERE id = $3
RETURNING id, name, active;

-- DELETE: Excluir uma atração (Se não houver referências)
DELETE FROM attractions 
WHERE id = $1;


-- ============================================================================
-- 3. TABELA: questions
-- ============================================================================

-- CREATE: Inserir uma nova pergunta vinculada a uma atração
INSERT INTO questions (attraction_id, question, active)
VALUES ($1, $2, $3)
RETURNING id, attraction_id, question, active;

-- READ: Listar todas as perguntas
SELECT id, attraction_id, question, active 
FROM questions 
ORDER BY attraction_id, id;

-- READ: Listar perguntas ativas de uma atração específica
SELECT id, question 
FROM questions 
WHERE attraction_id = $1 AND active = true 
ORDER BY id;

-- UPDATE: Atualizar o texto da pergunta ou status ativo
UPDATE questions 
SET question = $1, active = $2
WHERE id = $3
RETURNING id, attraction_id, question, active;

-- DELETE: Excluir uma pergunta
DELETE FROM questions 
WHERE id = $1;


-- ============================================================================
-- 4. TABELA: checklists
-- ============================================================================

-- CREATE: Registrar o cabeçalho de uma nova inspeção (checklist)
INSERT INTO checklists (user_id, attraction_id, date_time, notes)
VALUES ($1, $2, $3, $4)
RETURNING id, user_id, attraction_id, date_time, notes;

-- READ: Listar todos os checklists com filtros básicos
SELECT id, user_id, attraction_id, date_time, notes 
FROM checklists 
ORDER BY date_time DESC;

-- READ: Obter detalhes de um checklist específico por ID
SELECT id, user_id, attraction_id, date_time, notes 
FROM checklists 
WHERE id = $1;

-- READ: Listar checklists realizados por um inspetor específico
SELECT id, attraction_id, date_time, notes 
FROM checklists 
WHERE user_id = $1 
ORDER BY date_time DESC;

-- UPDATE: Atualizar as observações de um checklist
UPDATE checklists 
SET notes = $1
WHERE id = $2
RETURNING id, user_id, attraction_id, date_time, notes;

-- DELETE: Remover um checklist (Nota: Itens filhos em checklist_items devem ser removidos antes ou possuir cascade)
DELETE FROM checklists 
WHERE id = $1;


-- ============================================================================
-- 5. TABELA: checklist_items
-- ============================================================================

-- CREATE: Inserir conformidade para uma pergunta de um checklist
INSERT INTO checklist_items (checklist_id, question_id, compliant)
VALUES ($1, $2, $3)
RETURNING id, checklist_id, question_id, compliant;

-- READ: Listar todos os itens e respostas de conformidade de um checklist específico
SELECT id, question_id, compliant 
FROM checklist_items 
WHERE checklist_id = $1;

-- UPDATE: Alterar o status de conformidade de um item específico
UPDATE checklist_items 
SET compliant = $1
WHERE id = $2
RETURNING id, checklist_id, question_id, compliant;

-- DELETE: Excluir um item de resposta específico
DELETE FROM checklist_items 
WHERE id = $1;
