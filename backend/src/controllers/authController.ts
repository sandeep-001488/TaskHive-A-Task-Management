
import { Request, Response } from "express";
import { authService } from "../services/authService";
import { responseUtil } from "../utils/responseUtil";

interface SignUpRequestBody {
  email: string;
  password: string;
  name: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

export const authController = {
  signUp: async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;
      const file = req.file;

      console.log("Signup Request:", { email, name, hasFile: !!file });

      // Pass file buffer to the service if a file exists
      const user = await authService.signUp(email, password, name, file);

      return responseUtil.sendSuccess(res, "User created successfully", user);
    } catch (error: any) {
      console.error("Full Sign-up Error:", error);
      return responseUtil.sendError(res, error);
    }
  },

  login: async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
    try {
      const { email, password } = req.body;
      const token = await authService.login(email, password);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return responseUtil.sendSuccess(res, "Login successful", { token });
    } catch (error) {
      console.error("Login Error:", error);
      return responseUtil.sendError(res, error);
    }
  },

  logout: (req: Request, res: Response) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      return responseUtil.sendSuccess(res, "Logged out successfully");
    } catch (error) {
      console.error("Logout Error:", error);
      return responseUtil.sendError(res, error);
    }
  },
};
