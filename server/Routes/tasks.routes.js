import { Router } from "express";
import {
  deleteTask,
  getTask,
  getTaskById,
  postTask,
  putTask,
} from "../Controllers/task.controllers.js";
const router = Router();

router.get("/tasks", getTask);

router.get("/tasks/:id", getTaskById);

router.post("/tasks", postTask);

router.put("/tasks/:id", putTask);

router.delete("/tasks/:id", deleteTask);

export default router;
