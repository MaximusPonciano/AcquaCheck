-- ============================================================================
-- AcquaCheck: Script DDL - Estrutura do Banco de Dados
-- ============================================================================
-- Objetivo: Criar apenas a estrutura (tabelas, constraints, índices).
-- Dados de teste estão em: scripts/seed/
-- ============================================================================

DROP TABLE IF EXISTS checklist_items CASCADE;
DROP TABLE IF EXISTS checklists CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS attractions CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ============================================================================
-- 1. TABELA: users
-- ============================================================================
-- Armazena usuários (inspetores, gerentes, administradores) do sistema.
-- Índice crítico: email (autenticação JWT via e-mail).

CREATE TABLE users (
  id       SERIAL PRIMARY KEY,
  name     VARCHAR(100) NOT NULL,
  email    VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(250) NOT NULL,
  role     VARCHAR(20)  NOT NULL DEFAULT 'lifeguard'
           CHECK (role IN ('admin', 'lifeguard', 'manager'))
);

CREATE INDEX idx_users_email ON users(email);

-- ============================================================================
-- 2. TABELA: attractions
-- ============================================================================
-- Define as atrações (brinquedos/áreas) do parque aquático.

CREATE TABLE attractions (
  id     SERIAL PRIMARY KEY,
  name   VARCHAR(100) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true
);

-- ============================================================================
-- 3. TABELA: questions
-- ============================================================================
-- Perguntas/itens de verificação associados a cada atração.
-- Índice crítico: attraction_id (carregamento dinâmico de formulários).

CREATE TABLE questions (
  id            SERIAL PRIMARY KEY,
  attraction_id INTEGER      NOT NULL REFERENCES attractions(id),
  question      VARCHAR(255) NOT NULL,
  active        BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX idx_questions_attraction_id ON questions(attraction_id);

-- ============================================================================
-- 4. TABELA: checklists
-- ============================================================================
-- Registro principal de cada inspeção realizada.
-- Índices críticos: user_id (auditoria), attraction_id (manutenção),
-- date_time (filtros temporais).

CREATE TABLE checklists (
  id            SERIAL PRIMARY KEY,
  user_id       INTEGER   NOT NULL REFERENCES users(id),
  attraction_id INTEGER   NOT NULL REFERENCES attractions(id),
  date_time     TIMESTAMP NOT NULL DEFAULT NOW(),
  notes         TEXT
);

CREATE INDEX idx_checklists_user_id ON checklists(user_id);
CREATE INDEX idx_checklists_attraction_id ON checklists(attraction_id);
CREATE INDEX idx_checklists_date_time ON checklists(date_time);

-- ============================================================================
-- 5. TABELA: checklist_items
-- ============================================================================
-- Itens detalhados de cada checklist (relação N:N entre checklists e questions).
-- Índice crítico: checklist_id (renderização instantânea de resultados).

CREATE TABLE checklist_items (
  id           SERIAL PRIMARY KEY,
  checklist_id INTEGER NOT NULL REFERENCES checklists(id),
  question_id  INTEGER NOT NULL REFERENCES questions(id),
  compliant    BOOLEAN NOT NULL,
  CONSTRAINT uq_checklist_question UNIQUE (checklist_id, question_id)
);

CREATE INDEX idx_checklist_items_checklist_id ON checklist_items(checklist_id);
