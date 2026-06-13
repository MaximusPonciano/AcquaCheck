# Relatório de Arquitetura e Justificativa Técnica — AcquaCheck

Este documento apresenta as especificações técnicas, decisões de projeto, fundamentação teórica de normalização e a estratégia de indexação do banco de dados da plataforma AcquaCheck, em total conformidade com os critérios de aceite estabelecidos para o projeto.

---

## 1. Definição da Arquitetura

### 1.1 Escolha Tecnológica
* **Tipo de Banco de Dados:** Relacional (SQL).
* **Provedor Utilizado:** PostgreSQL 17 ou superior.

#### Por que SQL e não NoSQL?
O sistema AcquaCheck gerencia inspeções de segurança em atrações aquáticas. Os dados possuem estrutura rígida, bem definida e relacionamentos claros entre as entidades (`users` → `checklists` → `checklist_items` → `questions` → `attractions`). Esse cenário favorece um banco relacional (SQL), onde a integridade referencial, a consistência estrita e o cumprimento das propriedades ACID são garantidos nativamente pelo próprio motor do banco através de constraints e chaves estrangeiras.

#### Por que PostgreSQL especificamente?
* **Precisão Temporal:** Suporte nativo a `TIMESTAMP` / `TIMESTAMPTZ`, essencial para registrar e auditar as inspeções com exatidão de fuso horário.
* **Integridade Nativa:** Suporte robusto a `CHECK constraints`, índices de unicidade compostos (`UNIQUE`) e políticas de integridade referencial como `ON DELETE RESTRICT/CASCADE`.
* **Alinhamento com o Ecossistema:** Excelente sinergia de produção com o ambiente Node.js, utilizando o driver `pg` e o ORM Sequelize.
* **Padrão Open Source:** Tecnologia gratuita, amplamente documentada e ideal para conteinerização isolada via Docker.

### 1.2 Requisitos do Sistema

| Item | Descrição |
| :--- | :--- |
| **Objetivo do Sistema** | Registrar, monitorar e acompanhar listas de checagem (checklists) diárias de segurança em atrações de parques aquáticos. |
| **Entidades Principais** | Usuários (`users`), Atrações (`attractions`), Perguntas (`questions`), Checklists (`checklists`) e Itens de Checklist (`checklist_items`). |
| **Volume Estimado de Dados** | ~500 checklists/mês. Considerando ~15 itens por checklist, estima-se a geração de ~7.500 novos registros por mês na tabela pivô `checklist_items`. |
| **Quantidade de Usuários** | Entre 5 e 20 inspetores simultâneos operando por parque aquático. |
| **Principais Consultas** | Carregamento dinâmico de formulários de perguntas, buscas por resultados de checklists específicos, histórico de conformidade por atração e relatórios gerenciais de não-conformidades. |

---

## 2. Modelagem e Normalização

A modelagem física e lógica do AcquaCheck foi inteiramente submetida ao processo de normalização até a **3ª Forma Normal (3FN)** para mitigar redundâncias e anomalias de dados.

### Primeira Forma Normal (1FN)
* **Regra:** Cada coluna deve conter apenas valores atômicos (indivisíveis) e não deve haver grupos repetidos de colunas.
* **Aplicação no Projeto:** Todas as colunas armazenam un único valor por célula. Não existem arrays, listas ou campos multivalorados compostos. A resposta de cada pergunta (`compliant`) é um valor booleano isolado em uma linha na tabela filha `checklist_items`, impedindo o armazenamento de listas textuais ou estruturas complexas dentro do cabeçalho em `checklists`. Cada tupla é identificada de forma única por uma chave primária `id`.

### Segunda Forma Normal (2FN)
* **Regra:** O banco deve estar na 1FN e todos os atributos não-chave devem depender da totalidade da chave primária (sem dependências parciais).
* **Aplicação no Projeto:** Nenhuma tabela do ecossistema faz uso de chave primária composta; todas utilizam chaves simples estruturadas via `id SERIAL`. Na tabela pivô `checklist_items`, a constraint de unicidade `uq_checklist_question (checklist_id, question_id)` assegura a consistência da relação N:N. O atributo `compliant` depende funcionalmente do par completo (o checklist combinado com a pergunta específica) e não de apenas um deles isoladamente.

### Terceira Forma Normal (3FN)
* **Regra:** O banco deve estar na 2FN e não deve conter dependências transitivas (um atributo não-chave dependendo de outro atributo não-chave).
* **Aplicação no Projeto:** * Em `checklists`: Os atributos `date_time` e `notes` dependem única e exclusivamente do `id` do checklist. As colunas `user_id` e `attraction_id` atuam estritamente como ponteiras de chaves estrangeiras.
  * Os dados do usuário (como `name` e `email`) não são replicados em `checklists` — são consultados dinamicamente via `JOIN` com `users`.
  * O texto das perguntas (`question`) reside unicamente em `questions` associado ao `id` da pergunta, sem redundância de nomes de atrações dentro dela, isolando a transitividade.

### Ausência de Desnormalização
Não foi aplicada desnormalização intencional na estrutura. O volume de dados projetado para a operação corrente é perfeitamente absorvido por uma modelagem normalizada pura. Ganhos de performance para cenários de escrita concorrente e leitura analítica são resolvidos eficientemente pela estratégia de indexação B-Tree adotada.

---

## 3. Performance e Estratégia de Indexação

Para otimizar o tempo de resposta das consultas críticas e garantir eficiência em operações de junção (`JOINs`) e filtragem, foram definidos os seguintes índices baseados na estrutura de árvore balanceada (**B-Tree**):

| Tabela | Campo do Índice | Tipo | Motivo / Access Pattern |
| :--- | :--- | :--- | :--- |
| `users` | `email` | B-Tree | **Autenticação:** A busca por e-mail único é a operação de maior criticidade na segurança e geração do token JWT. |
| `questions` | `attraction_id` | B-Tree | **Formulário Dinâmico:** Acelera o carregamento das perguntas específicas vinculadas no momento em que o inspetor abre um checklist para uma atração. |
| `checklists` | `user_id` | B-Tree | **Auditoria:** Otimiza consultas do histórico de rotina e o desempenho de auditorias individuais por inspetor. |
| `checklists` | `attraction_id` | B-Tree | **Manutenção:** Facilita a varredura cronológica e relatórios de segurança voltados a um brinquedo específico do parque. |
| `checklists` | `date_time` | B-Tree | **Filtros Temporais:** Crucial para consultas gerenciais por período, relatórios mensais e filtros de data na abertura dos portões. |
| `checklist_items` | `checklist_id` | B-Tree | **Renderização de Resultados:** Permite recuperar instantaneamente todas as respostas detalhadas pertencentes a um checklist gerado. |

Todos os índices manuais e implícitos operam sob a arquitetura **B-Tree**, cobrindo com eficiência buscas exatas por igualdade (`=`) e varreduras por intervalos (`BETWEEN`, `>`, `<`), mapeando perfeitamente o fluxo operacional do sistema AquaCheck.