import { Router } from "express";
import { authController } from "../controllers/authController";
import { rateLimiter } from "../middlewares/rateLimiter";
import { upload } from "../middlewares/uploadMiddleware";

const router = Router();

router.post("/signup",upload.single("profilePhoto"), authController.signUp);
router.post("/login", rateLimiter, authController.login);
router.post("/logout", authController.logout);

export default router;
