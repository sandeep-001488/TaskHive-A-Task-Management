"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const authService_1 = require("../services/authService");
const responseUtil_1 = require("../utils/responseUtil");
exports.authController = {
    signUp: async (req, res) => {
        try {
            const { email, password, name } = req.body;
            const user = await authService_1.authService.signUp(email, password, name);
            return responseUtil_1.responseUtil.sendSuccess(res, "User created successfully", user);
        }
        catch (error) {
            console.error("Sign-up Error:", error);
            return responseUtil_1.responseUtil.sendError(res, error);
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const token = await authService_1.authService.login(email, password);
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
            return responseUtil_1.responseUtil.sendSuccess(res, "Login successful", { token });
        }
        catch (error) {
            console.error("Login Error:", error);
            return responseUtil_1.responseUtil.sendError(res, error);
        }
    },
    logout: (req, res) => {
        try {
            res.clearCookie("token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
            return responseUtil_1.responseUtil.sendSuccess(res, "Logged out successfully");
        }
        catch (error) {
            console.error("Logout Error:", error);
            return responseUtil_1.responseUtil.sendError(res, error);
        }
    },
};
