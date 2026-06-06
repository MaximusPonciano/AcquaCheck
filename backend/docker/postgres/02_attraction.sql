CREATE TABLE attractions (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  description TEXT,
  active      BOOLEAN      NOT NULL DEFAULT true
);

INSERT INTO attractions (name, active) VALUES 
('Tobogã Insano',   true),
('Piscina de Ondas', true),
('Rio Lento',        true);