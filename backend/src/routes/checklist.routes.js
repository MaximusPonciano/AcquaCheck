import express from "express";
import ListChecklistController from "../app/http/controllers/Checklists/ListChecklistController.js";
import GetChecklistController from "../app/http/controllers/Checklists/GetChecklistController.js";  


import authenticator from "../app/http/middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticator);

router.get("/", ListChecklistController);
router.get("/:id", GetChecklistController);

export default router;