export default {
  "/checklists": {
    "get": {
      "summary": "Lista todos os checklists",
      "tags": ["Checklists"],
      "responses": { "200": { "description": "Sucesso" } }
    },
    "post": {
      "summary": "Cria um novo checklist",
      "tags": ["Checklists"],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "user_id": { "type": "integer", "example": 2 },
                "attraction_id": { "type": "integer", "example": 1 },
                "notes": { "type": "string", "example": "Tudo OK na inspeção" },
                "items": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "question_id": { "type": "integer", "example": 1 },
                      "compliant": { "type": "boolean", "example": true }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "responses": { "201": { "description": "Criado com sucesso" } }
    }
  },
  "/checklists/{id}": {
    "get": {
      "summary": "Retorna um checklist",
      "tags": ["Checklists"],
      "parameters": [ { "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } } ],
      "responses": { "200": { "description": "Sucesso" } }
    },
    "put": {
      "summary": "Atualiza um checklist",
      "tags": ["Checklists"],
      "parameters": [ { "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } } ],
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "notes": { "type": "string", "example": "Anotação atualizada após manutenção" }
              }
            }
          }
        }
      },
      "responses": { "200": { "description": "Atualizado com sucesso" } }
    },
    "delete": {
      "summary": "Remove um checklist",
      "tags": ["Checklists"],
      "parameters": [ { "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } } ],
      "responses": { "200": { "description": "Removido com sucesso" } }
    }
  }
};
