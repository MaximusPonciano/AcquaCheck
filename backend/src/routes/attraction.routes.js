import express from "express";
import ListAttractionController from "../app/http/controllers/AttractionApi/ListAttractionController.js";
import GetAttractionController from "../app/http/controllers/AttractionApi/GetAttractionController.js";
import CreateAttractionController from "../app/http/controllers/AttractionApi/CreateAttractionController.js";
import UpdateAttractionController from "../app/http/controllers/AttractionApi/UpdateAttractionController.js";
import authenticator from "../app/http/middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticator);

router.get("/", ListAttractionController);
router.get("/:id", GetAttractionController);
router.post("/", CreateAttractionController);
router.put("/:id", UpdateAttractionController);

export default router;