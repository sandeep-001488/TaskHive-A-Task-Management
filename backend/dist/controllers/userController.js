"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userService_1 = require("../services/userService");
const responseUtil_1 = require("../utils/responseUtil");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.userController = {
    getProfile: async (req, res) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ message: "User not authenticated" });
            }
            const user = await userService_1.userService.getProfile(userId);
            responseUtil_1.responseUtil.sendSuccess(res, "User profile", user);
        }
        catch (error) {
            responseUtil_1.responseUtil.sendError(res, error);
        }
    },
    updateProfile: async (req, res) => {
        try {
            const userId = req.user?.id;
            const { name, password } = req.body;
            if (!userId) {
                return res.status(401).json({ message: "User not authenticated" });
            }
            const hashedPassword = password
                ? await bcrypt_1.default.hash(password, 10)
                : undefined;
            const updatedUser = await userService_1.userService.updateProfile(userId, {
                name,
                password: hashedPassword,
            });
            responseUtil_1.responseUtil.sendSuccess(res, "Profile updated successfully", updatedUser);
        }
        catch (error) {
            responseUtil_1.responseUtil.sendError(res, error);
        }
    },
};
