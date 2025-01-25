"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
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
router.get("/profile", async (req, res) => {
    try {
        await userController_1.userController.getProfile(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching profile", error });
    }
});
router.put("/profile", async (req, res) => {
    await userController_1.userController.updateProfile(req, res);
});
exports.default = router;
