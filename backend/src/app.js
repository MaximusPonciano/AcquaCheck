import express from "express";
import cors from "cors";
import helmet from "helmet"; 
import { config, messages } from "./config/constants.js";
import apiRoutes from "./routes/index.js";
import "./database/relations.js"; // Inicia as associações (Attraction -> Question)
const app = express();

app.use(helmet()); 

app.use(cors({ origin: config.server.corsOrigin }));
app.use(express.json());

app.use("/", apiRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ message: messages.common.error.routeNotFound });
});

app.use((err, req, res, next) => {
  console.error("Erro Crítico:", err);
  res.status(500).json({ message: messages.common.error.serverError });
});

export default app;