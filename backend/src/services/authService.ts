import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { config } from "../config/dbConfig";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authService = {
  signUp: async (email: string, password: string, name?: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    return user;
  },

  login: async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ id: user.id }, config.jwtSecret, {
      expiresIn: "1h",
    });
    return token;
  },
};
