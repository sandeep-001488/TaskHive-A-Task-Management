"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dbConfig_1 = require("../config/dbConfig");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
exports.authService = {
    signUp: async (email, password, name) => {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
        return user;
    },
    login: async (email, password) => {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user || !(await bcrypt_1.default.compare(password, user.password))) {
            throw new Error("Invalid email or password");
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, dbConfig_1.config.jwtSecret, {
            expiresIn: "7h",
        });
        return token;
    },
};
