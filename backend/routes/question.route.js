import express from "express";
import {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  bulkUploadQuestions,
} from "../controllers/question.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleCheckMiddleware } from "../middlewares/roleCheckMiddleware.js";

const questionRouter = express.Router();

// Apply auth and admin check only to /questions routes
questionRouter.use("/questions", authMiddleware, roleCheckMiddleware);

questionRouter.post("/questions", createQuestion);
questionRouter.put("/questions/:id", updateQuestion);
questionRouter.delete("/questions/:id", deleteQuestion);
questionRouter.post("/questions/bulk/:quizId", bulkUploadQuestions);

export default questionRouter;
