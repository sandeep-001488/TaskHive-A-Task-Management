"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.userService = {
    getProfile: async (userId) => {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    },
    updateProfile: async (userId, data) => {
        const updateData = {};
        if (data.name)
            updateData.name = data.name;
        if (data.password)
            updateData.password = data.password;
        const user = await prisma.user.update({
            where: { id: userId },
            data: updateData,
            select: {
                id: true,
                email: true,
                name: true,
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    },
};
