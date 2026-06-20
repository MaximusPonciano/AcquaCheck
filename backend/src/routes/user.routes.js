import express from "express";
import CreateUserController from "../app/http/controllers/UserApi/CreateUserController.js";
import ListUserController from "../app/http/controllers/UserApi/ListUserController.js";
import GetUserController from "../app/http/controllers/UserApi/GetUserController.js";
import UpdateUserController from "../app/http/controllers/UserApi/UpdateUserController.js";
import DeleteUserController from "../app/http/controllers/UserApi/DeleteUserController.js";
import authenticator from "../app/http/middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticator);

router.post("/", CreateUserController);
router.get("/", ListUserController);
router.get("/:id", GetUserController);
router.put("/:id", UpdateUserController);
router.delete("/:id", DeleteUserController);

export default router;