"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoController_1 = require("../controllers/todoController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.use(async (req, res, next) => {
    try {
        await (0, authMiddleware_1.authMiddleware)(req, res, next);
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token or authentication failed" });
    }
});
router.get("/", async (req, res) => {
    try {
        await todoController_1.todoController.getTodos(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching todos", error });
    }
});
router.post("/", async (req, res) => {
    try {
        await todoController_1.todoController.createTodo(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating todo", error });
    }
});
router.get("/:id", async (req, res) => {
    try {
        await todoController_1.todoController.getTodoById(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching todo", error });
    }
});
router.put("/:id", async (req, res) => {
    try {
        await todoController_1.todoController.updateTodo(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating todo", error });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        await todoController_1.todoController.deleteTodo(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting todo", error });
    }
});
exports.default = router;
