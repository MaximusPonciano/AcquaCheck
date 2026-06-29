# AcquaCheck API

O **AcquaCheck** é um sistema voltado para a gestão e inspeção de parques aquáticos, garantindo que os checklists de segurança e manutenção das atrações sejam executados e monitorados de forma eficiente.

Este repositório contém a infraestrutura de backend da aplicação, operando sob uma arquitetura de microsserviços conteinerizada e orquestrada para alta disponibilidade.

---

## Pré-requisitos

Para garantir que o ambiente execute corretamente, você precisará das seguintes ferramentas:

- **Docker** e **Docker Compose** (recomendado Docker Desktop com integração WSL2 para usuários Windows).
- Porta `80` livre no host (para o Proxy Reverso Nginx).
- Acesso à internet para o download das imagens base e dependências.

---

## Guia de Instalação e Execução

O projeto utiliza o `docker-compose` para orquestrar todos os serviços necessários em um único comando.

1. Clone o repositório e acesse a raiz do projeto no seu terminal.
2. Configure as variáveis de ambiente:
   - Acesse o diretório `backend/`.
   - Duplique o arquivo `.env.example` e renomeie-o para `.env`.
   - Mantenha os valores padrão (eles coincidem com as credenciais do banco de dados provisionado pelo Docker).
3. Na raiz do projeto, execute o comando de build e inicialização:
   ```bash
   docker-compose up -d --build
   ```
4. O processo fará o _Multi-stage build_ da imagem da API e provisionará os containers do Banco de Dados (Postgres), Cache (Redis) e Proxy Reverso (Nginx).
5. Assim que o banco de dados estiver saudável, a API executará automaticamente as Migrations (estruturas das tabelas) e Seeders (dados iniciais, como o usuário administrador).

---

## Arquitetura de Infraestrutura

A infraestrutura foi construída seguindo as melhores práticas de Engenharia DevOps:

- **Otimização de Imagens (Multi-stage Build):** O `Dockerfile` do backend foi arquitetado em múltiplos estágios. Usamos a imagem enxuta `node:24-alpine` isolando a aplicação para rodar no usuário restrito `node` (não-root) e copiando apenas os artefatos de produção. O _Layer Caching_ é otimizado e o `.dockerignore` previne que a pasta `node_modules` local contamine a imagem final.
- **Persistência de Dados (Named Volumes):** Configuramos _Named Volumes_ gerenciados pelo Docker (`postgres_data` e `redis_data`), garantindo que o estado do sistema se mantenha seguro e íntegro mesmo que os containers sejam recriados.
- **Rede Inteligente e Service Discovery:** Todos os serviços estão alocados em uma _Custom Bridge Network_ chamada `acquacheck_network`. A comunicação interna ocorre via DNS nativo do Docker (ex: `redis://redis_cache`).
- **Orquestração e Limites:** O serviço principal (`backend`) possui `replicas: 2`, garantindo resiliência. Limites estritos de CPU e Memória foram aplicados para garantir estabilidade no consumo do cluster.
- **Isolamento de Perímetro:** Apenas o Nginx publica portas externas (porta 80). Contêineres de banco de dados (`db_acquacheck` e `redis_cache`) operam em rede estritamente privada, sem exposição host-port, garantindo segurança máxima.

---

## Acesso e Monitoramento

### Acessando a Aplicação

O tráfego principal é roteado pelo Nginx (Proxy Reverso) e distribuído entre as réplicas ativas da API.

- **URL Base:** `http://localhost/api`
- **Documentação Swagger (OpenAPI):** Acesse `http://localhost/api/api-docs/` no navegador para testar visualmente todos os endpoints.

> **Nota de Segurança:** Se você tentar acessar `localhost:5432` pelo seu SGBD, a conexão será recusada. Isso comprova o isolamento perimetral, onde o banco de dados só pode ser acessado de dentro da própria rede do Docker.

### Comandos Úteis

Para monitorar a saúde dos serviços:

- **Listar os containers e status de healthcheck:**
  ```bash
  docker ps
  ```
- **Acompanhar os logs da API em tempo real:**
  ```bash
  docker-compose logs -f backend
  ```

---

## Troubleshooting e Limpeza

- **Destruição Completa do Ambiente:**
  Para parar os serviços, remover as redes e excluir definitivamente os volumes persistentes (apagando os dados do banco):

  ```bash
  docker-compose down -v
  ```
 
- **Rebuild Forçado:**
  Se precisar invalidar o cache de build das imagens do Docker:
  ```bash
  docker-compose build --no-cache
  ```

  # Link do drive: https://drive.google.com/file/d/1TR3EFRYFKVEheDSKXtHXC1adGE7GTXiQ/view
