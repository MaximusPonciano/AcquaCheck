import express from "express";
import ListAttractionController from "../app/http/controllers/AttractionApi/ListAttractionController.js";

import authenticator from "../app/http/middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticator);

router.get("/", ListAttractionController);

export default router;