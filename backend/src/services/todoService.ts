import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const todoService = {
  getTodos: async (userId: string) => {
    return await prisma.toDo.findMany({
      where: { userId },
    });
  },

  createTodo: async (userId: string, title: string, description?: string) => {
    return await prisma.toDo.create({
      data: {
        userId,
        title,
        description,
      },
    });
  },
  getTodoById: async (id: string, userId: string) => {
    return await prisma.toDo.findUnique({
      where: {
        id,
        userId, 
      },
    });
  },

  updateTodo: async (
    id: string,
    userId: string,
    title: string,
    description?: string
  ) => {
    const todo = await prisma.toDo.update({
      where: { id },
      data: { title, description },
    });
    return todo;
  },

  deleteTodo: async (id: string, userId: string) => {
    await prisma.toDo.delete({
      where: { id }, 
    });
  },
};
