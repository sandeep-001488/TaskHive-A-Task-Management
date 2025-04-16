import { Request, Response } from "express";
import { userService } from "../services/userService";
import { responseUtil } from "../utils/responseUtil";
import { User } from "@prisma/client";
import bcrypt from 'bcrypt'
import { uploadToCloudinary } from "../utils/cloudinaryUtil";

export const userController = {
  getProfile: async (req: Request, res: Response) => {
    try {
      const userId = (req as { user?: User }).user?.id;

      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const user = await userService.getProfile(userId);
      responseUtil.sendSuccess(res, "User profile", user);
    } catch (error) {
      responseUtil.sendError(res, error);
    }
  },
  // updateProfile: async (req: Request, res: Response) => {
  //   try {
  //     const userId = (req as { user?: User }).user?.id;
  //     const { name, password } = req.body;

  //     if (!userId) {
  //       return res.status(401).json({ message: "User not authenticated" });
  //     }

  //     const hashedPassword = password
  //       ? await bcrypt.hash(password, 10)
  //       : undefined;

  //     const updatedUser = await userService.updateProfile(userId, {
  //       name,
  //       password: hashedPassword,
  //     });

  //     responseUtil.sendSuccess(
  //       res,
  //       "Profile updated successfully",
  //       updatedUser
  //     );
  //   } catch (error) {
  //     responseUtil.sendError(res, error);
  //   }
  //},
  updateProfile: async (req: Request, res: Response) => {
    try {
      const userId = (req as { user?: User }).user?.id;
      const { name, password } = req.body;

      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      let profilePhotoUrl: string | undefined;

      // Upload profile photo if provided
      if (req.file) {
        profilePhotoUrl = await uploadToCloudinary(
          req.file.buffer,
          "taskhive/profiles"
        );
      }

      const hashedPassword = password
        ? await bcrypt.hash(password, 10)
        : undefined;

      const updatedUser = await userService.updateProfile(userId, {
        name,
        password: hashedPassword,
        profilePhoto: profilePhotoUrl,
      });

      responseUtil.sendSuccess(
        res,
        "Profile updated successfully",
        updatedUser
      );
    } catch (error) {
      responseUtil.sendError(res, error);
    }
  },
};
