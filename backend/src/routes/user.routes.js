import express from "express";
import ListUserController from "../app/controllers/UserApi/ListUserController.js";
import authenticator from "../app/middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticator);

router.get("/", ListUserController);

export default router;