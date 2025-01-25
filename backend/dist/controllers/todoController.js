"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoController = void 0;
const todoService_1 = require("../services/todoService");
const responseUtil_1 = require("../utils/responseUtil");
exports.todoController = {
    getTodos: async (req, res) => {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        try {
            const todos = await todoService_1.todoService.getTodos(userId);
            responseUtil_1.responseUtil.sendSuccess(res, "Fetched todos", todos);
        }
        catch (error) {
            responseUtil_1.responseUtil.sendError(res, error);
        }
    },
    createTodo: async (req, res) => {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        try {
            const { title, description } = req.body;
            const todo = await todoService_1.todoService.createTodo(userId, title, description);
            responseUtil_1.responseUtil.sendSuccess(res, "Todo created", todo);
        }
        catch (error) {
            responseUtil_1.responseUtil.sendError(res, error);
        }
    },
    getTodoById: async (req, res) => {
        const userId = req.user?.id;
        const todoId = req.params.id;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        try {
            const todo = await todoService_1.todoService.getTodoById(todoId, userId);
            responseUtil_1.responseUtil.sendSuccess(res, "Fetched todo", todo);
        }
        catch (error) {
            responseUtil_1.responseUtil.sendError(res, error);
        }
    },
    updateTodo: async (req, res) => {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        try {
            const { id, title, description } = req.body;
            const updatedTodo = await todoService_1.todoService.updateTodo(id, userId, title, description);
            responseUtil_1.responseUtil.sendSuccess(res, "Todo updated", updatedTodo);
        }
        catch (error) {
            responseUtil_1.responseUtil.sendError(res, error);
        }
    },
    deleteTodo: async (req, res) => {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        try {
            const { id } = req.params;
            await todoService_1.todoService.deleteTodo(id, userId);
            responseUtil_1.responseUtil.sendSuccess(res, "Todo deleted");
        }
        catch (error) {
            responseUtil_1.responseUtil.sendError(res, error);
        }
    },
};
