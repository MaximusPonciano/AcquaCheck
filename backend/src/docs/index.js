import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const paths = {};

// Carrega todos os arquivos .js da pasta docs (exceto o index.js) dinamicamente
const files = fs.readdirSync(__dirname).filter(file => file !== "index.js" && file.endsWith(".js"));

for (const file of files) {
  const module = await import(`./${file}`);
  Object.assign(paths, module.default);
}

const isDocker = fs.existsSync("/.dockerenv");
const defaultUrl = isDocker ? "http://localhost/api" : "http://localhost:3000";

export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "AcquaCheck API",
    version: "1.0.0",
    description: "API RESTful para o sistema de checklist de parques aquáticos AcquaCheck."
  },
  servers: [
    {
      url: process.env.SWAGGER_SERVER_URL || defaultUrl,
      description: isDocker ? "Servidor Nginx (Docker)" : "Servidor Node (Local NPM)"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ],
  paths
};
