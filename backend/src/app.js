import express from "express";
import cors from "cors";
import helmet from "helmet"; 
import { config, messages } from "./config/constants.js";
import apiRoutes from "./routes/index.js";

import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./docs/index.js";

const app = express();  

app.use(helmet()); 

app.use(cors({ origin: config.server.corsOrigin }));
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", apiRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ message: messages.common.error.routeNotFound });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("Erro Crítico:", err);
  res.status(500).json({ message: messages.common.error.serverError });
});

export default app;