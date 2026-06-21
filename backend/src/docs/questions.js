export default {
  "/questions": {
    "get": {
      "summary": "Lista todas as perguntas",
      "tags": ["Questions"],
      "responses": { "200": { "description": "Sucesso" } }
    },
    "post": {
      "summary": "Cria uma nova pergunta",
      "tags": ["Questions"],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "attraction_id": { "type": "integer", "example": 1 },
                "question": { "type": "string", "example": "O novo sensor está funcionando?" },
                "active": { "type": "boolean", "example": true }
              }
            }
          }
        }
      },
      "responses": { "201": { "description": "Criada com sucesso" } }
    }
  },
  "/questions/{id}": {
    "get": {
      "summary": "Retorna uma pergunta",
      "tags": ["Questions"],
      "parameters": [ { "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } } ],
      "responses": { "200": { "description": "Sucesso" } }
    },
    "put": {
      "summary": "Atualiza uma pergunta",
      "tags": ["Questions"],
      "parameters": [ { "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } } ],
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "question": { "type": "string", "example": "Pergunta Atualizada?" }
              }
            }
          }
        }
      },
      "responses": { "200": { "description": "Atualizada com sucesso" } }
    },
    "delete": {
      "summary": "Remove uma pergunta",
      "tags": ["Questions"],
      "parameters": [ { "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } } ],
      "responses": { "200": { "description": "Removida com sucesso" } }
    }
  }
};
