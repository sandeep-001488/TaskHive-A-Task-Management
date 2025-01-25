
import { Router } from "express";
import { todoController } from "../controllers/todoController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use(async (req, res, next) => {
  try {
    await authMiddleware(req, res, next);
  } catch (error) {
    res.status(401).json({ message: "Invalid token or authentication failed" });
  }
});
router.get("/", async (req, res) => {
  try {
    await todoController.getTodos(req, res); 
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
});

router.post("/", async (req, res) => {
  try {
    await todoController.createTodo(req, res); 
  } catch (error) {
    res.status(500).json({ message: "Error creating todo", error });
  }
});
router.get("/:id", async (req, res) => {
  try {
    await todoController.getTodoById(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todo", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    await todoController.updateTodo(req, res); 
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await todoController.deleteTodo(req, res); 
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
});

export default router;