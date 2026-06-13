-- ============================================================================
-- AcquaCheck: Consultas Avançadas
-- ============================================================================
-- Este arquivo apresenta consultas complexas, utilizando JOINs múltiplos, 
-- CTEs (Common Table Expressions), Window Functions, Subconsultas e Filtros Temporais.
-- ============================================================================

-- ============================================================================
-- 1. HISTÓRICO DETALHADO DE INSPEÇÕES (Multi-JOIN)
-- ============================================================================
-- Finalidade: Listar todos os checklists realizados, trazendo informações do 
-- inspetor (users), da atração (attractions), além de estatísticas rápidas
-- de conformidade para cada checklist.
SELECT 
  c.id AS checklist_id,
  c.date_time AS data_hora_inspecao,
  a.name AS atracao_nome,
  u.name AS inspetor_nome,
  u.role AS inspetor_funcao,
  COUNT(ci.id) AS total_itens_avaliados,
  COUNT(CASE WHEN ci.compliant = true THEN 1 END) AS itens_conformes,
  COUNT(CASE WHEN ci.compliant = false THEN 1 END) AS itens_nao_conformes,
  c.notes AS observacoes
FROM checklists c
JOIN users u ON c.user_id = u.id
JOIN attractions a ON c.attraction_id = a.id
LEFT JOIN checklist_items ci ON c.id = ci.checklist_id
GROUP BY c.id, c.date_time, a.name, u.name, u.role, c.notes
ORDER BY c.date_time DESC;


-- ============================================================================
-- 2. RELATÓRIO DE NÃO-CONFORMIDADES (Filtro e Junções)
-- ============================================================================
-- Finalidade: Listar especificamente quais itens/perguntas falharam nas 
-- inspeções de segurança. Crucial para gerar alertas imediatos de manutenção.
SELECT 
  ci.id AS item_id,
  c.id AS checklist_id,
  c.date_time AS data_hora_inspecao,
  a.name AS atracao_nome,
  q.question AS item_inspecionado,
  u.name AS inspetor_nome,
  c.notes AS observacao_checklist
FROM checklist_items ci
JOIN checklists c ON ci.checklist_id = c.id
JOIN questions q ON ci.question_id = q.id
JOIN attractions a ON c.attraction_id = a.id
JOIN users u ON c.user_id = u.id
WHERE ci.compliant = false
ORDER BY c.date_time DESC, a.name;


-- ============================================================================
-- 3. FILTRO TEMPORAL CRONOLÓGICO (Uso de Índices)
-- ============================================================================
-- Finalidade: Filtrar checklists realizados em um período específico.
-- Otimizado pelo índice idx_checklists_date_time.
-- Exemplo: Consultas de auditoria do mês de Maio de 2026.
SELECT 
  c.id AS checklist_id,
  c.date_time AS data_hora_inspecao,
  a.name AS atracao_nome,
  u.name AS inspetor_nome
FROM checklists c
JOIN attractions a ON c.attraction_id = a.id
JOIN users u ON c.user_id = u.id
WHERE c.date_time BETWEEN '2026-05-01 00:00:00' AND '2026-05-31 23:59:59'
ORDER BY c.date_time ASC;


-- ============================================================================
-- 4. SUBCONSULTAS DE INTEGRIDADE (EXISTS / NOT EXISTS)
-- ============================================================================
-- Finalidade A: Encontrar perguntas ativas que NUNCA registraram uma falha 
-- (compliant = false) em nenhuma das inspeções realizadas até o momento.
SELECT q.id, q.question, a.name AS atracao_nome
FROM questions q
JOIN attractions a ON q.attraction_id = a.id
WHERE q.active = true
  AND NOT EXISTS (
    SELECT 1 
    FROM checklist_items ci 
    WHERE ci.question_id = q.id 
      AND ci.compliant = false
  )
ORDER BY a.name, q.id;

-- Finalidade B: Encontrar atrações ativas que não passaram por NENHUMA 
-- inspeção (checklist) nos últimos 7 dias da linha do tempo (ex: a partir de 2026-06-03).
SELECT a.id, a.name
FROM attractions a
WHERE a.active = true
  AND NOT EXISTS (
    SELECT 1 
    FROM checklists c 
    WHERE c.attraction_id = a.id 
      AND c.date_time >= '2026-06-03 00:00:00'
  )
ORDER BY a.name;


-- ============================================================================
-- 5. CTE (Common Table Expression) PARA TAXA DE CONFORMIDADE
-- ============================================================================
-- Finalidade: Calcular a taxa de conformidade em porcentagem para cada checklist,
-- e listar apenas os checklists que possuem taxa inferior a 90%, sinalizando
-- atrações que precisam de atenção.
WITH checklist_stats AS (
  SELECT 
    c.id AS checklist_id,
    c.date_time AS data_hora,
    a.name AS atracao_nome,
    COUNT(ci.id) AS total_itens,
    COUNT(CASE WHEN ci.compliant = true THEN 1 END) AS itens_ok
  FROM checklists c
  JOIN attractions a ON c.attraction_id = a.id
  JOIN checklist_items ci ON c.id = ci.checklist_id
  GROUP BY c.id, c.date_time, a.name
)
SELECT 
  checklist_id,
  data_hora,
  atracao_nome,
  total_itens,
  itens_ok,
  ROUND((itens_ok::decimal / total_itens) * 100, 2) AS taxa_conformidade_pct
FROM checklist_stats
WHERE total_itens > 0
  AND (itens_ok::decimal / total_itens) < 0.90
ORDER BY taxa_conformidade_pct ASC, data_hora DESC;


-- ============================================================================
-- 6. WINDOW FUNCTION (RANKING DE INSPEÇÕES RECENTES)
-- ============================================================================
-- Finalidade: Ranquear cronologicamente os checklists de cada atração para obter 
-- as 2 inspeções mais recentes de cada brinquedo. Útil para painéis de monitoramento.
WITH ranked_checklists AS (
  SELECT 
    c.id AS checklist_id,
    c.date_time AS data_hora,
    a.name AS atracao_nome,
    u.name AS inspetor_nome,
    ROW_NUMBER() OVER (
      PARTITION BY c.attraction_id 
      ORDER BY c.date_time DESC
    ) AS row_num
  FROM checklists c
  JOIN attractions a ON c.attraction_id = a.id
  JOIN users u ON c.user_id = u.id
)
SELECT 
  checklist_id,
  data_hora,
  atracao_nome,
  inspetor_nome
FROM ranked_checklists
WHERE row_num <= 2
ORDER BY atracao_nome, row_num;
