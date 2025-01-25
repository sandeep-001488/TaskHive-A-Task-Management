"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.todoService = {
    getTodos: async (userId) => {
        return await prisma.toDo.findMany({
            where: { userId },
        });
    },
    createTodo: async (userId, title, description) => {
        return await prisma.toDo.create({
            data: {
                userId,
                title,
                description,
            },
        });
    },
    getTodoById: async (id, userId) => {
        return await prisma.toDo.findUnique({
            where: {
                id,
                userId,
            },
        });
    },
    updateTodo: async (id, userId, title, description) => {
        const todo = await prisma.toDo.update({
            where: { id },
            data: { title, description },
        });
        return todo;
    },
    deleteTodo: async (id, userId) => {
        await prisma.toDo.delete({
            where: { id },
        });
    },
};
