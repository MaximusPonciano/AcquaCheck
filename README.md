# AcquaCheck - Sistema de Gestão e Inspeção 🌊

**Descrição:** O AcquaCheck é uma plataforma corporativa para registro, monitoramento e acompanhamento de listas de checagem (checklists) diárias de segurança em atrações de parques aquáticos.
**Caminho Arquitetural Escolhido:** **Opção A (Docker/Orquestração Local)**.

---

## 2. Pré-requisitos

Para rodar este ecossistema na sua máquina, você precisará ter instalado:

- **Ambiente Linux/WSL2** (Para usuários Windows).
- **Docker Engine & Docker Compose** (ou Docker Desktop).
- **Git** (Para clonar e versionar o repositório).
- Conta no **Docker Hub** (Apenas se quiser testar o pipeline de CI/CD manualmente).

---

## 3. Guia de Instalação e Execução ("How to Up")

Subir a infraestrutura completa do AcquaCheck é um processo de comando único, garantindo o isolamento total da aplicação.

1. Clone o repositório e acesse a pasta raiz:

   ```bash
   git clone <url-do-seu-repositorio>
   cd AcquaCheck
   ```

2. Crie o seu arquivo de segredos locais (veja a seção de Gestão de Segredos):

   ```bash
   cp backend/.env.example backend/.env
   ```

3. Construa as imagens otimizadas e suba a Stack em modo "detached" (segundo plano):

   ```bash
   docker-compose up -d --build
   ```

4. Verifique se os 5 containers (2 réplicas do App, DB, Cache e Nginx) estão rodando e saudáveis:
   ```bash
   docker ps
   ```

---

## 4. Detalhamento Técnico da Infraestrutura

### 4.1 Otimização de Imagens (Dockerfile)

O `backend/Dockerfile` foi arquitetado utilizando o padrão **Multi-stage Build**.

- **Stage 1 (Builder):** Baixa o Node.js Alpine, otimiza o _Layer Caching_ copiando apenas o `package.json` primeiro, e instala todas as dependências (incluindo as de dev).
- **Stage 2 (Runner):** Gera uma imagem final enxuta, copiando apenas as dependências de produção (`npm install --omit=dev && npm cache clean --force`) e o código-fonte puro.
- **Isolamento de Lixo e Segurança:** Utilizamos um `.dockerignore` rigoroso. Além disso, os artefatos são copiados definindo permissões explícitas (`--chown=node:node`).
- **Gestão de Sinais (PID 1):** Evitamos o uso de `npm start`. O arquivo utiliza `CMD ["node", "server.js"]` para garantir que o processo receba os sinais de SO (`SIGTERM`) e encerre graciosamente (Graceful Shutdown).

### 4.2 Persistência de Dados

Abandonamos o uso efêmero de contêineres para o banco de dados. Utilizamos **Named Volumes** (`postgres_data`) acoplados ao container `db_acquacheck`. Isso garante que caso o container sofra restart, falha ou seja apagado (`docker rm`), os registros das inspeções e tabelas permaneçam intactos no disco local do Docker.

### 4.3 Rede e Comunicação (Ponte Inteligente)

Criamos a **Custom Bridge Network** chamada `acquacheck_network`.

- **DNS Interno Nativo:** É estritamente proibido o uso de IPs estáticos no nosso `.env`. O backend Node.js se conecta ao banco chamando-o pelo host `db_acquacheck` e ao cache pelo host `redis_cache`. O Service Discovery do Docker resolve a comunicação.
- **Isolamento Perimetral:** As portas 5432 (Banco) e 3000 (Node) funcionam apenas dentro da rede isolada. O mundo exterior só consegue se comunicar com a nossa aplicação através da porta 80 via Nginx (Proxy Reverso).

### 4.4 Segurança e Imutabilidade

- Os containers, especialmente o Node.js, rodam utilizando um usuário sem privilégios (`USER node` no Dockerfile), em vez de root, seguindo o Princípio do Menor Privilégio.
- O código injetado dentro da imagem de produção é tratado como um **Template Imutável** (Read-Only na perspectiva de negócio). Alterações de código não refletem dentro do container sem um novo build, garantindo a integridade do artefato.

### 4.5 Resiliência e Alta Disponibilidade (Production-Grade)

Para garantir que a infraestrutura se comporte como um ambiente de produção (SRE/DevOps), implementamos:
- **Healthchecks Integrados:** O backend só sobe quando o `db_acquacheck` e o `redis_cache` relatam que estão efetivamente saudáveis (`condition: service_healthy`), evitando crashes no boot.
- **Escalabilidade (Réplicas):** Utilizamos a arquitetura de **Stack**, definindo `replicas: 2` para o backend. O Nginx faz o balanceamento de carga nativo distribuindo o tráfego.
- **Limites de Recursos:** Os contêineres possuem `resources.limits` restritos de CPU e Memória, blindando a máquina Host contra vazamentos.
- **Log Rotation:** Foi configurada rotação de logs (`max-size: 10m` e `max-file: 3`) para impedir que o disco da máquina lote com arquivos `.log` do Docker.

---

## 5. Gestão de Segredos e Configurações

**Aviso Crítico:** Nunca comite senhas, tokens JWT ou chaves de banco de dados no repositório. O `.gitignore` foi configurado para bloquear qualquer arquivo `.env*`.

Para configurar a aplicação, nós fornecemos o arquivo de modelo `backend/.env.example`.
O avaliador deve duplicar esse arquivo, renomeá-lo para `.env` e preencher as senhas locais antes de subir a stack. O Docker Compose está instruído a ler essas credenciais em tempo de execução via diretiva `env_file`.

---

## 6. Evidências de Funcionamento e Verificação

Comandos para o Avaliador auditar a infraestrutura:

- **Resolução DNS e Isolamento de Rede:**
  ```bash
  docker inspect acquacheck_network
  ```
- **Verificar os logs de arranque seguro do banco e da aplicação:**
  ```bash
  docker-compose logs -f
  ```
- **Acessar a aplicação rodando com sucesso na porta 80 via Nginx:**
  Navegue para [http://localhost](http://localhost) ou [http://localhost/api/](http://localhost/api/)

---

## 7. Troubleshooting e Limpeza

**Problema Comum:** "A porta 5432 ou 80 já está em uso na minha máquina."
**Solução:** Derrube serviços locais conflitantes (como um Postgres rodando direto no Windows) ou altere a porta exposta no `docker-compose.yml` (ex: `"5433:5432"`).

**Como Destruir o Ambiente (Limpeza)**
Para apagar todos os containers, redes personalizadas e **destruir permanentemente o banco de dados** para evitar custos ou sujeira na máquina pós-avaliação:

```bash
docker-compose down -v
```

_(Remova a flag `-v` caso queira desligar a stack mas manter os dados salvos)._
