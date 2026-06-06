import express from "express";
import cors from "cors";
import helmet from "helmet"; 
import { config } from "./config/constants.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(helmet()); 

app.use(cors({ origin: config.server.corsOrigin }));
app.use(express.json());
app.use("/", authRoutes);
app.use(config.api.prefixUser, userRoutes);

export default app;