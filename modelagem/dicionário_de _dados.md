## Dicionário de Dados

### Tabela: `users`
| Campo | Tipo de Dado | Restrições | Descrição | Exemplo |
| :--- | :--- | :--- | :--- | :--- |
| `id` | Serial | PK, Auto-increment | Identificador único do utilizador. | `1` |
| `name` | VARCHAR(100) | NOT NULL | Nome completo do utilizador. | `João Silva` |
| `email` | VARCHAR(100) | UNIQUE, NOT NULL | E-mail (usado para login). | `joao@parque.com` |
| `password` | VARCHAR(250) | NOT NULL | Senha criptografada (Hash). | `$2b$10$AzR...` |
| `role` | VARCHAR(20) | NOT NULL | Nível de acesso ('admin', 'lifeguard', 'manager'). | `lifeguard` |

### Tabela: `attractions`
| Campo | Tipo de Dado | Restrições | Descrição | Exemplo |
| :--- | :--- | :--- | :--- | :--- |
| `id` | Serial | PK, Auto-increment | Identificador único da atração. | `5` |
| `name` | VARCHAR(100) | NOT NULL | Nome da atração/brinquedo. | `Toboágua Radical` |
| `active` | Boolean | NOT NULL | Indica se a atração está ativa. | `true` |

### Tabela: `questions`
| Campo | Tipo de Dado | Restrições | Descrição | Exemplo |
| :--- | :--- | :--- | :--- | :--- |
| `id` | Serial | PK, Auto-increment | Identificador único da pergunta. | `102` |
| `attraction_id` | Integer | FK (attractions.id), NOT NULL | Identifica a atração desta pergunta. | `5` |
| `question` | VARCHAR(255) | NOT NULL | O item a ser verificado na inspeção. | `Presença de salva-vidas no posto?` |
| `active` | Boolean | NOT NULL | Indica se a pergunta está ativa. | `true` |

### Tabela: `checklists`
| Campo | Tipo de Dado | Restrições | Descrição | Exemplo |
| :--- | :--- | :--- | :--- | :--- |
| `id` | Serial | PK, Auto-increment | Identificador único do checklist. | `1500` |
| `user_id` | Integer | FK (users.id), NOT NULL | Utilizador que realizou a inspeção. | `1` |
| `attraction_id` | Integer | FK (attractions.id), NOT NULL | Atração que foi inspecionada. | `5` |
| `date_time` | Timestamp | NOT NULL | Data e hora do registo. | `2026-06-06 15:00:00` |
| `notes` | Text | Opcional | Observações gerais sobre o estado. | `Leve desgaste na escada.` |

### Tabela: `checklist_items`
| Campo | Tipo de Dado | Restrições | Descrição | Exemplo |
| :--- | :--- | :--- | :--- | :--- |
| `id` | Serial | PK, Auto-increment | Identificador único do item. | `45000` |
| `checklist_id` | Integer | FK (checklists.id), NOT NULL | Vincula ao checklist geral. | `1500` |
| `question_id` | Integer | FK (questions.id), NOT NULL | Vincula à pergunta específica. | `102` |
| `compliant` | Boolean | NOT NULL | Define se está em conformidade (true/false). | `true` |