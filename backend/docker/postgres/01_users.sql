CREATE TABLE users (
  id       SERIAL PRIMARY KEY,
  name     VARCHAR(100) NOT NULL,
  email    VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(250) NOT NULL,
  role     VARCHAR(20)  NOT NULL DEFAULT 'lifeguard'
                        CHECK (role IN ('admin', 'lifeguard', 'manager'))
);

INSERT INTO users (name, email, password, role) VALUES 
('Maximus Ponciano', 'admin@acquacheck.com', '$2b$10$xpYCukDqWzsy9qbv5h8b4ObsthbpdkUwXHPcKPHNel1ohR8ztMncW', 'admin');
