CREATE TABLE checklist_items (
  id           SERIAL  PRIMARY KEY,
  checklist_id INTEGER NOT NULL REFERENCES checklists(id),
  question_id  INTEGER NOT NULL REFERENCES questions(id),
  compliant    BOOLEAN NOT NULL,

  CONSTRAINT uq_checklist_question UNIQUE (checklist_id, question_id)
);

INSERT INTO checklist_items (checklist_id, question_id, compliant) VALUES 
(1, 1, true),
(1, 2, true);