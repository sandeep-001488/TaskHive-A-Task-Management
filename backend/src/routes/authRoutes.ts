import { Router } from "express";
import { authController } from "../controllers/authController";
import { rateLimiter } from "../middlewares/rateLimiter";

const router = Router();

router.post("/signup", authController.signUp);
router.post("/login", rateLimiter, authController.login);
router.post("/logout", authController.logout);

export default router;
