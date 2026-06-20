import express from "express";
import ListQuestionController from "../app/http/controllers/QuestionApi/ListQuestionController.js";
import GetQuestionController from "../app/http/controllers/QuestionApi/GetQuestionController.js";
import CreateQuestionController from "../app/http/controllers/QuestionApi/CreateQuestionController.js";

import authenticator from "../app/http/middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticator);

router.get("/", ListQuestionController);
router.get("/:id", GetQuestionController);
router.post("/", CreateQuestionController);

export default router;