import express from "express";
import {
  changeUserRole,
  deleteUser,
  loginUser,
  registerUser,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleCheckMiddleware } from "../middlewares/roleCheckMiddleware.js";
import errorHandler from "../utils/errorHandler.js";
const authRouter = express.Router();
authRouter.post("/register", errorHandler(registerUser));
authRouter.post("/login", errorHandler(loginUser));
authRouter.post(
  "/change-user-role",
  authMiddleware,
  roleCheckMiddleware,
  errorHandler(changeUserRole)
);
authRouter.delete("/delete", authMiddleware, roleCheckMiddleware, errorHandler(deleteUser));

export default authRouter;
