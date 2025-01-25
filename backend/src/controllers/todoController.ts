import { Request, Response } from "express";
import { todoService } from "../services/todoService";
import { responseUtil } from "../utils/responseUtil";
import { User } from "@prisma/client";

export const todoController = {
  getTodos: async (req: Request, res: Response): Promise<void | Response> => {
    const userId = (req as { user?: User }).user?.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    try {
      const todos = await todoService.getTodos(userId);
      responseUtil.sendSuccess(res, "Fetched todos", todos);
    } catch (error) {
      responseUtil.sendError(res, error);
    }
  },

  createTodo: async (req: Request, res: Response): Promise<void | Response> => {
    const userId = (req as { user?: User }).user?.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    try {
      const { title, description } = req.body;
      const todo = await todoService.createTodo(userId, title, description);
      responseUtil.sendSuccess(res, "Todo created", todo);
    } catch (error) {
      responseUtil.sendError(res, error);
    }
  },
  getTodoById: async (
    req: Request,
    res: Response
  ): Promise<void | Response> => {
    const userId = (req as { user?: User }).user?.id;
    const todoId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    try {
      const todo = await todoService.getTodoById(todoId, userId);
      responseUtil.sendSuccess(res, "Fetched todo", todo);
    } catch (error) {
      responseUtil.sendError(res, error);
    }
  },

  updateTodo: async (req: Request, res: Response): Promise<void | Response> => {
    const userId = (req as { user?: User }).user?.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    try {
      const { id, title, description } = req.body;
      const updatedTodo = await todoService.updateTodo(
        id,
        userId,
        title,
        description
      );
      responseUtil.sendSuccess(res, "Todo updated", updatedTodo);
    } catch (error) {
      responseUtil.sendError(res, error);
    }
  },

  deleteTodo: async (req: Request, res: Response): Promise<void | Response> => {
    const userId = (req as { user?: User }).user?.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    try {
      const { id } = req.params;
      await todoService.deleteTodo(id, userId);
      responseUtil.sendSuccess(res, "Todo deleted");
    } catch (error) {
      responseUtil.sendError(res, error);
    }
  },
};
