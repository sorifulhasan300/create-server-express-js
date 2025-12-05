import { Request, Response } from "express";
import { createTodoService, getTodoService } from "./user.service";

const createTodo = async (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  console.log(req.body);
  try {
    const result = await createTodoService(user_id, title);
    console.log(result);
    res.status(201).json({
      success: "success",
      message: "data inserted successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "data inserted unsuccessfully",
      error: error,
    });
  }

  res.status(201).json({
    success: "success",
    message: "data inserted successfully",
  });
};

const getTodo = async (req: Request, res: Response) => {
  try {
    const result = await getTodoService();
    res.status(200).json({
      success: true,
      message: "Todos get successfully",
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Todos get unsuccessfully",
      error: error,
    });
  }
};

export const Todo = {
  createTodo,
  getTodo,
};
