import express from "express";
import { login, logout } from "../app/http/controllers/UserApi/auth.controller.js";
import authenticator from "../app/http/middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", authenticator, logout);

export default router;