CREATE TABLE checklists (
  id            SERIAL PRIMARY KEY,
  user_id       INTEGER   NOT NULL REFERENCES users(id),
  attraction_id INTEGER   NOT NULL REFERENCES attractions(id),
  date_time     TIMESTAMP NOT NULL DEFAULT NOW(),
  notes         TEXT
);

INSERT INTO checklists (user_id, attraction_id, notes) VALUES 
(1, 1, 'Inspeção matinal de rotina realizada com sucesso. Tudo pronto para abertura.');