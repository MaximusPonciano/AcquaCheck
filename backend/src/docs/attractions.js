export default {
  "/attractions": {
    "get": {
      "summary": "Lista todas as atrações",
      "tags": ["Attractions"],
      "responses": { "200": { "description": "Sucesso" } }
    },
    "post": {
      "summary": "Cria uma nova atração",
      "tags": ["Attractions"],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "name": { "type": "string", "example": "Nova Atração" },
                "active": { "type": "boolean", "example": true }
              }
            }
          }
        }
      },
      "responses": { "201": { "description": "Criada com sucesso" } }
    }
  },
  "/attractions/{id}": {
    "get": {
      "summary": "Retorna uma atração",
      "tags": ["Attractions"],
      "parameters": [ { "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } } ],
      "responses": { "200": { "description": "Sucesso" } }
    },
    "put": {
      "summary": "Atualiza uma atração",
      "tags": ["Attractions"],
      "parameters": [ { "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } } ],
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "name": { "type": "string", "example": "Atração Atualizada" }
              }
            }
          }
        }
      },
      "responses": { "200": { "description": "Atualizada com sucesso" } }
    },
    "delete": {
      "summary": "Remove uma atração",
      "tags": ["Attractions"],
      "parameters": [ { "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } } ],
      "responses": { "200": { "description": "Removida com sucesso" } }
    }
  }
};
