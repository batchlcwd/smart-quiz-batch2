import express from "express";
import { generateQuiz } from "../controllers/ai.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleCheckMiddleware } from "../middlewares/roleCheckMiddleware.js";

const aiRouter = express.Router();

// Apply auth and admin check only to /ai routes
aiRouter.use("/ai", authMiddleware, roleCheckMiddleware);

aiRouter.post("/ai/generate", generateQuiz);

export default aiRouter;
