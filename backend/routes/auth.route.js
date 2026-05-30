import express from "express";
import {
  deleteUser,
  loginUser,
  registerUser,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.delete("/delete", authMiddleware, deleteUser);

export default authRouter;
