import jwt from "jsonwebtoken";
import { config } from "../config/dbConfig";

export const jwtUtil = {
  generateToken: (userId: string) => {
    return jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: "7h" });
  },

  verifyToken: (token: string) => {
    return jwt.verify(token, config.jwtSecret);
  },
};
