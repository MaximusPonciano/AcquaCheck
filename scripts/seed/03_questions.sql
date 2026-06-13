-- ============================================================================
-- Tabela: questions
-- ============================================================================

INSERT INTO questions (attraction_id, question, active) VALUES
  -- Tobogã Insano (atração 1)
  (1, 'O sensor de fluxo de água está funcionando?', true),
  (1, 'As juntas do tobogã estão lisas e sem frestas?', true),
  (1, 'Há danos na fibra de vidro ou superfície de contato?', true),
  (1, 'Os sistemas de parada de emergência estão operacionais?', true),
  (1, 'O tubo possui válvulas de bloqueio manual?', true),
  (1, 'Há acúmulo de algas ou depósitos no interior?', true),

  -- Piscina de Ondas (atração 2)
  (2, 'O gerador de ondas está operando sem ruídos anormais?', true),
  (2, 'Os botões de parada de emergência estão acessíveis?', true),
  (2, 'Os flutuadores de segurança estão ao redor da piscina?', true),
  (2, 'A profundidade é mantida conforme especificação?', true),
  (2, 'O filtro de água está limpo e funcionando?', true),
  (2, 'Há rachaduras nas paredes ou fundo da piscina?', true),

  -- Rio Lento (atração 3)
  (3, 'O fluxo de água está regulado corretamente?', true),
  (3, 'Os flutuadores estão em bom estado de conservação?', true),
  (3, 'Há objetos soltos ou obstáculos no leito?', true),
  (3, 'A qualidade da água está dentro dos padrões?', true),
  (3, 'As laterais estão seguras sem protuberâncias?', true),
  (3, 'O sistema de drenagem está funcionando?', true),

  -- Escorrega Misterioso (atração 4)
  (4, 'A estrutura está firme e sem oscilações?', true),
  (4, 'Os degraus estão antiderrapantes?', true),
  (4, 'Há fissuras ou lascas no material?', true),
  (4, 'O escorregador está hidratado (molhado)?', true),
  (4, 'Os corrimãos estão seguros e bem fixos?', true),
  (4, 'A base de recebimento tem colchonetes?', true),

  -- Piscina Infantil (atração 5)
  (5, 'A profundidade máxima não ultrapassa 60cm?', true),
  (5, 'Os brinquedos flutuantes estão seguros?', true),
  (5, 'O piso antiderrapante está em bom estado?', true),
  (5, 'A qualidade da água está apropriada?', true),
  (5, 'Há salva-vidas presente na área?', true),
  (5, 'Os drenos estão desimpedidos?', true),

  -- Jacuzzi Tropical (atração 6)
  (6, 'A temperatura está entre 35-40°C?', true),
  (6, 'Os jatos de hidromassagem estão funcionando?', true),
  (6, 'O sistema de aquecimento está operacional?', true),
  (6, 'Há vazamentos visíveis?', true),
  (6, 'O nível de cloro está adequado?', true),
  (6, 'A estrutura não apresenta danos?', true),

  -- Toboágua Radical (atração 7)
  (7, 'A estrutura de suporte está firme?', true),
  (7, 'Os tubos estão livres de obstáculos?', true),
  (7, 'Há luzes de emergência funcionando?', true),
  (7, 'O sistema de frenagem está operacional?', true),
  (7, 'A zona de chegada possui colchões de segurança?', true),
  (7, 'Não há identificações de perigo danificadas?', true),

  -- Piscina de Mergulho (atração 8)
  (8, 'A profundidade mínima é mantida (mínimo 2m)?', true),
  (8, 'Os trampolins estão seguros e sem fissuras?', true),
  (8, 'A escada de acesso está segura?', true),
  (8, 'Há linhas de profundidade visíveis?', true),
  (8, 'O fundo está limpo e visível?', true),
  (8, 'Os salva-vidas estão posicionados adequadamente?', true);
