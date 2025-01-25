import { Router } from "express";
import { userController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use(async (req, res, next) => {
  try {
    await authMiddleware(req, res, next);
  } catch (error) {
    res.status(401).json({ message: "Invalid token or authentication failed" });
  }
});

router.get("/profile", async (req, res) => {
  try {
    await userController.getProfile(req, res); 
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
});
router.put("/profile", async (req, res) => {
  await userController.updateProfile(req, res);
});
export default router;
