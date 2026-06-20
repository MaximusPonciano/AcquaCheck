CREATE TABLE users (
  id       SERIAL PRIMARY KEY,
  name     VARCHAR(100) NOT NULL,
  email    VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(250) NOT NULL,
  role       VARCHAR(20)  NOT NULL DEFAULT 'lifeguard'
                          CHECK (role IN ('admin', 'lifeguard', 'manager')),
  deleted_at TIMESTAMP    DEFAULT NULL
);

INSERT INTO users (name, email, password, role) VALUES 
('Maximus Ponciano', 'admin@acquacheck.com', '$2b$10$GhYYe6WhgWabAohFd1YRCuURm3b2JdF6j9prr7rWog5ZISQctr792', 'admin');
