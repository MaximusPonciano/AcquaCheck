import express from "express";
import ListQuestionController from "../app/http/controllers/QuestionApi/ListQuestionController.js";

import authenticator from "../app/http/middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticator);

router.get("/", ListQuestionController);

export default router;