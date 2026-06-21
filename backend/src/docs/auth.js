export default {
  "/login": {
    "post": {
      "summary": "Realiza o login",
      "tags": ["Auth"],
      "security": [],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "email": { "type": "string", "example": "admin@acquacheck.com" },
                "password": { "type": "string", "example": "31599499" }
              }
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Login realizado com sucesso",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "token": { "type": "string" },
                  "user": { "type": "object" }
                }
              }
            }
          }
        }
      }
    }
  },
  "/logout": {
    "post": {
      "summary": "Realiza o logout (Invalida o token JWT)",
      "tags": ["Auth"],
      "responses": {
        "200": {
          "description": "Logout realizado com sucesso"
        },
        "401": {
          "description": "Token não fornecido ou já invalidado"
        }
      }
    }
  }
};
