import express from "express";
import ListChecklistController from "../app/http/controllers/Checklists/ListChecklistController.js";
import GetChecklistController from "../app/http/controllers/Checklists/GetChecklistController.js";
import CreateChecklistController from "../app/http/controllers/Checklists/CreateChecklistController.js";
import UpdateChecklistController from "../app/http/controllers/Checklists/UpdateChecklistController.js";
import DeleteChecklistController from "../app/http/controllers/Checklists/DeleteChecklistController.js";
import authenticator from "../app/http/middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticator);

router.get("/", ListChecklistController);
router.get("/:id", GetChecklistController);
router.post("/", CreateChecklistController);
router.put("/:id", UpdateChecklistController);
router.delete("/:id", DeleteChecklistController);

export default router;