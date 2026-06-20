import express from "express";
import ListQuestionController from "../app/http/controllers/QuestionApi/ListQuestionController.js";
import GetQuestionController from "../app/http/controllers/QuestionApi/GetQuestionController.js";
import authenticator from "../app/http/middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticator);

router.get("/", ListQuestionController);
router.get("/:id", GetQuestionController);

export default router;