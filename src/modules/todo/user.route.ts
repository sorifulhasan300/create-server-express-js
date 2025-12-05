import { Router } from "express";
import { Todo } from "./todo.controller";

const router = Router();

router.post("/", Todo.createTodo);

router.get("/", Todo.getTodo);

export const todoRouter = router;
