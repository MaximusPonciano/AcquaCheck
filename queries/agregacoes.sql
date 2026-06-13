-- ============================================================================
-- AcquaCheck: Consultas com Agrupamentos e Agregações (Analytical Queries)
-- ============================================================================
-- Este arquivo apresenta consultas de agrupamento analítico utilizando GROUP BY,
-- HAVING, funções de contagem (COUNT), soma condicional (SUM) e médias calculadas.
-- ============================================================================

-- ============================================================================
-- 1. TOTAL DE INSPEÇÕES REALIZADAS POR ATRAÇÃO
-- ============================================================================
-- Finalidade: Contar a quantidade total de checklists que foram submetidos para
-- cada brinquedo do parque, ordenado do mais inspecionado para o menos.
SELECT 
  a.id AS atracao_id,
  a.name AS atracao_nome,
  COUNT(c.id) AS quantidade_checklists
FROM attractions a
LEFT JOIN checklists c ON a.id = c.attraction_id
GROUP BY a.id, a.name
ORDER BY quantidade_checklists DESC, a.name;


-- ============================================================================
-- 2. QUANTIDADE DE ITENS EM CONFORMIDADE E NÃO-CONFORMIDADE POR ATRAÇÃO
-- ============================================================================
-- Finalidade: Sumarizar a quantidade absoluta de respostas corretas e falhas 
-- detectadas nas perguntas das vistorias de cada atração.
SELECT 
  a.name AS atracao_nome,
  COUNT(ci.id) AS total_itens_verificados,
  SUM(CASE WHEN ci.compliant = true THEN 1 ELSE 0 END) AS total_conformes,
  SUM(CASE WHEN ci.compliant = false THEN 1 ELSE 0 END) AS total_nao_conformes
FROM attractions a
JOIN checklists c ON a.id = c.attraction_id
JOIN checklist_items ci ON c.id = ci.checklist_id
GROUP BY a.id, a.name
ORDER BY total_nao_conformes DESC, a.name;


-- ============================================================================
-- 3. TAXA MÉDIA DE CONFORMIDADE GERAL POR ATRAÇÃO (Ranking)
-- ============================================================================
-- Finalidade: Calcular o percentual médio de aprovação/conformidade para cada 
-- atração. Essencial para avaliar quais brinquedos oferecem maior risco ou 
-- demandam mais manutenção preventiva.
SELECT 
  a.name AS atracao_nome,
  COUNT(ci.id) AS total_respostas,
  SUM(CASE WHEN ci.compliant = true THEN 1 ELSE 0 END) AS respostas_ok,
  ROUND(
    (SUM(CASE WHEN ci.compliant = true THEN 1 ELSE 0 END)::decimal / COUNT(ci.id)) * 100, 
    2
  ) AS taxa_conformidade_geral_pct
FROM attractions a
JOIN checklists c ON a.id = c.attraction_id
JOIN checklist_items ci ON c.id = ci.checklist_id
GROUP BY a.id, a.name
ORDER BY taxa_conformidade_geral_pct ASC; -- Piores índices de conformidade listados primeiro


-- ============================================================================
-- 4. DESEMPENHO E PRODUTIVIDADE DOS INSPETORES
-- ============================================================================
-- Finalidade: Exibir o total de checklists preenchidos por cada usuário e o
-- número total de itens de verificação que foram revisados individualmente.
SELECT 
  u.name AS inspetor_nome,
  u.role AS funcao,
  COUNT(DISTINCT c.id) AS checklists_realizados,
  COUNT(ci.id) AS itens_verificados
FROM users u
LEFT JOIN checklists c ON u.id = c.user_id
LEFT JOIN checklist_items ci ON c.id = ci.checklist_id
GROUP BY u.id, u.name, u.role
ORDER BY checklists_realizados DESC, inspetor_nome;


-- ============================================================================
-- 5. EVOLUÇÃO E AGRUPAMENTO TEMPORAL (Por Ano e Mês)
-- ============================================================================
-- Finalidade: Agrupar as inspeções e identificar o volume de não-conformidades
-- separadas mês a mês, permitindo análise histórica de sazonalidade ou evolução.
SELECT 
  TO_CHAR(c.date_time, 'YYYY-MM') AS ano_mes,
  COUNT(DISTINCT c.id) AS total_checklists,
  COUNT(ci.id) AS total_itens_revisados,
  SUM(CASE WHEN ci.compliant = false THEN 1 ELSE 0 END) AS total_falhas_periodo
FROM checklists c
JOIN checklist_items ci ON c.id = ci.checklist_id
GROUP BY TO_CHAR(c.date_time, 'YYYY-MM')
ORDER BY ano_mes DESC;


-- ============================================================================
-- 6. IDENTIFICAÇÃO DE ATRAÇÕES COM CRITICIDADE DE FALHA (Filtro HAVING)
-- ============================================================================
-- Finalidade: Listar apenas atrações que registraram mais do que 2 itens em 
-- não-conformidade (compliant = false) ao longo de todo o histórico, isolando 
-- os casos mais críticos do parque.
SELECT 
  a.name AS atracao_nome,
  COUNT(DISTINCT c.id) AS checklists_com_falha,
  SUM(CASE WHEN ci.compliant = false THEN 1 ELSE 0 END) AS total_nao_conformes_registrados
FROM attractions a
JOIN checklists c ON a.id = c.attraction_id
JOIN checklist_items ci ON c.id = ci.checklist_id
WHERE ci.compliant = false
GROUP BY a.id, a.name
HAVING SUM(CASE WHEN ci.compliant = false THEN 1 ELSE 0 END) > 2
ORDER BY total_nao_conformes_registrados DESC;
