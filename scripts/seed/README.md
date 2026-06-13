# Dados de Teste - AcquaCheck

Arquivos de seed para carregar dados de teste no banco de dados PostgreSQL.

## Estrutura

```
seed/
├── 01_users.sql           # 6 usuários (1 admin, 5 inspetores)
├── 02_attractions.sql     # 8 atrações (brinquedos do parque)
├── 03_questions.sql       # 48 perguntas (~6 por atração)
├── 04_checklists.sql      # 80 checklists (30 dias × 2-3/dia)
└── 05_checklist_items.sql # ~480 itens (~6 por checklist)
```

## Total de Registros

| Tabela | Registros |
|--------|-----------|
| users | 6 |
| attractions | 8 |
| questions | 48 |
| checklists | 80 |
| checklist_items | ~480 |
| **TOTAL** | **~622** |

Atende ao requisito mínimo de **100 registros relevantes** para avaliação de performance.

## Como Executar

### Opção 1: Script automatizado (Linux/Mac)
```bash
bash scripts/seed.sh
```

### Opção 2: Executar manualmente (todas as plataformas)
```bash
# 1. Criar estrutura (DDL)
psql -U postgres -d acquacheck -f scripts/setup.sql

# 2. Carregar dados (seed) em ordem
psql -U postgres -d acquacheck -f scripts/seed/01_users.sql
psql -U postgres -d acquacheck -f scripts/seed/02_attractions.sql
psql -U postgres -d acquacheck -f scripts/seed/03_questions.sql
psql -U postgres -d acquacheck -f scripts/seed/04_checklists.sql
psql -U postgres -d acquacheck -f scripts/seed/05_checklist_items.sql
```

### Opção 3: Via Docker Compose
```bash
docker compose exec postgres psql -U postgres -d acquacheck -f scripts/setup.sql
docker compose exec postgres bash scripts/seed.sh
```

## Dados de Teste

### Usuários
- **admin@acquacheck.com** - administrador
- **joao.silva@acquacheck.com** - lifeguard
- **maria.santos@acquacheck.com** - lifeguard
- **pedro.costa@acquacheck.com** - manager
- **ana.oliveira@acquacheck.com** - lifeguard
- **carlos.mendes@acquacheck.com** - lifeguard

Todas as senhas são hash bcrypt.

### Atrações
1. Tobogã Insano
2. Piscina de Ondas
3. Rio Lento
4. Escorrega Misterioso
5. Piscina Infantil
6. Jacuzzi Tropical
7. Toboágua Radical
8. Piscina de Mergulho

### Período Simulado
- **Início:** 11 de maio de 2026
- **Fim:** 10 de junho de 2026
- **Duração:** ~30 dias
- **Frequência:** 2-3 checklists por dia por atração

### Conformidades
Maioria dos registros tem `compliant = true`, com alguns `false` para simular cenários reais de não-conformidade (útil para testes de relatórios).

## Verificação

Após executar os seeds, verifique:

```sql
SELECT
  (SELECT COUNT(*) FROM users) as usuarios,
  (SELECT COUNT(*) FROM attractions) as atracoes,
  (SELECT COUNT(*) FROM questions) as perguntas,
  (SELECT COUNT(*) FROM checklists) as checklists,
  (SELECT COUNT(*) FROM checklist_items) as itens_checklist;
```

Resultado esperado:
```
 usuarios | atracoes | perguntas | checklists | itens_checklist
----------+----------+----------+----------+------------------
        6 |        8 |       48 |       80 |             ~480
```

## Notas Importantes

- **Ordem de execução:** Respeite a numeração (01_, 02_, ...) para evitar violações de FK
- **Idempotência:** Pode executar multiple vezes (setup.sql faz DROP IF EXISTS)
- **Dados fictícios:** Todos os dados são coerentes com o domínio do AcquaCheck
- **Performance:** 480 registros é suficiente para testar índices e otimizações
