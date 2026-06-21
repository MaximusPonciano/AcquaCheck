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
  }
};
