#!/bin/bash

# ==============================================================================
# Script de Automação de Deploy - Infraestrutura AcquaCheck (Opção A)
# Este script cumpre o requisito de Automação/CI-CD para a avaliação de DevOps
# ==============================================================================

echo "======================================================"
echo "🚀 INICIANDO PIPELINE DE DEPLOY - ACQUACHECK"
echo "======================================================"

echo ""
echo "[1/4] 🧹 Limpando infraestrutura e redes antigas..."
docker-compose down

echo ""
echo "[2/4] 🏗️ Realizando o build otimizado e subindo os containers..."
# Aqui é onde capturamos a saída do build (Multi-stage + npm ci)
docker-compose up -d --build

echo ""
echo "[3/4] ⏳ Aguardando o Healthcheck do Banco de Dados PostgreSQL..."
# Espera ativa baseada no status real do container, ao invés de tempo fixo
until docker inspect db_acquacheck_container --format='{{.State.Health.Status}}' | grep -q "healthy"; do
  echo "   Banco ainda não está pronto, aguardando..."
  sleep 3
done
echo "   Banco pronto!"

echo ""
echo "[4/4] 🗄️ Executando rotinas de banco de dados via CLI..."
# Executa as migrations usando o container efêmero
echo "-> Rodando Migrations..."
docker-compose run --rm cli migrate

echo "-> Rodando Seeders (Carga inicial)..."
docker-compose run --rm cli seed

echo ""
echo "======================================================"
echo "✅ DEPLOY CONCLUÍDO COM SUCESSO!"
echo "======================================================"
echo "🌐 A infraestrutura está rodando."
echo "👉 Documentação da API: http://localhost/api/api-docs/"
echo "======================================================"
