-- ============================================================================
-- Tabela: users
-- ============================================================================

INSERT INTO users (name, email, password, role) VALUES
  ('Maximus Ponciano',       'admin@acquacheck.com',        '$2b$10$xpYCukDqWzsy9qbv5h8b4ObsthbpdkUwXHPcKPHNel1ohR8ztMncW', 'admin'),
  ('João Silva',             'joao.silva@acquacheck.com',   '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJK', 'lifeguard'),
  ('Maria Santos',           'maria.santos@acquacheck.com', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJK', 'lifeguard'),
  ('Pedro Costa',            'pedro.costa@acquacheck.com',  '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJK', 'manager'),
  ('Ana Oliveira',           'ana.oliveira@acquacheck.com', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJK', 'lifeguard'),
  ('Carlos Mendes',          'carlos.mendes@acquacheck.com','$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJK', 'lifeguard');
