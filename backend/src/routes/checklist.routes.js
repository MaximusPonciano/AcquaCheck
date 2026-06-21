import express from "express";
import ListChecklistController from "../app/http/controllers/Checklists/ListChecklistController.js";
import authenticator from "../app/http/middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticator);

router.get("/", ListChecklistController);

export default router;