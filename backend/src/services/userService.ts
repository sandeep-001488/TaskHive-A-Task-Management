import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userService = {
  getProfile: async (userId: string) => {
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
  updateProfile: async (
    userId: string,
    data: {
      name?: string;
      password?: string;
    }
  ) => {
    const updateData: { name?: string; password?: string } = {};

    if (data.name) updateData.name = data.name;
    if (data.password) updateData.password = data.password;

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
