import express from "express";
import { config } from "../config/constants.js";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import attractionRoutes from "./attraction.routes.js";
import questionRoutes from "./question.routes.js";
import checklistRoutes from "./checklist.routes.js";

const router = express.Router();

router.use("/", authRoutes);
router.use(config.api.prefixUser, userRoutes);
router.use(config.api.prefixAttraction, attractionRoutes);
router.use(config.api.prefixQuestion, questionRoutes);
router.use(config.api.prefixChecklist, checklistRoutes);
export default router;
