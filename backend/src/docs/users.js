export default {
  "/users": {
    "get": {
      "summary": "Lista todos os usuários",
      "tags": ["Users"],
      "responses": { "200": { "description": "Sucesso" } }
    },
    "post": {
      "summary": "Cria um novo usuário",
      "tags": ["Users"],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "name": { "type": "string", "example": "Novo Guarda-vidas" },
                "email": { "type": "string", "example": "novo@acquacheck.com" },
                "password": { "type": "string", "example": "123456" },
                "role": { "type": "string", "example": "lifeguard" }
              }
            }
          }
        }
      },
      "responses": { "201": { "description": "Criado com sucesso" } }
    }
  },
  "/users/{id}": {
    "get": {
      "summary": "Retorna um usuário específico",
      "tags": ["Users"],
      "parameters": [ { "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } } ],
      "responses": { "200": { "description": "Sucesso" } }
    },
    "put": {
      "summary": "Atualiza um usuário específico",
      "tags": ["Users"],
      "parameters": [ { "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } } ],
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "name": { "type": "string", "example": "Usuário Editado" },
                "role": { "type": "string", "example": "manager" }
              }
            }
          }
        }
      },
      "responses": { "200": { "description": "Atualizado com sucesso" } }
    },
    "delete": {
      "summary": "Remove um usuário específico",
      "tags": ["Users"],
      "parameters": [ { "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } } ],
      "responses": { "200": { "description": "Removido com sucesso" } }
    }
  }
};
