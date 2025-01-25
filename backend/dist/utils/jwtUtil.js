"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtUtil = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dbConfig_1 = require("../config/dbConfig");
exports.jwtUtil = {
    generateToken: (userId) => {
        return jsonwebtoken_1.default.sign({ id: userId }, dbConfig_1.config.jwtSecret, { expiresIn: "7h" });
    },
    verifyToken: (token) => {
        return jsonwebtoken_1.default.verify(token, dbConfig_1.config.jwtSecret);
    },
};
