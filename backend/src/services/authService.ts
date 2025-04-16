import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { config } from "../config/dbConfig";
import bcrypt from "bcrypt";
import { Express } from "express";
import { uploadToCloudinary } from "../utils/cloudinaryUtil";

const prisma = new PrismaClient();

export const authService = {
  signUp: async (
    email: string,
    password: string,
    name?: string,
    profilePhoto?: Express.Multer.File
  ) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle profile photo upload
    let profilePhotoUrl: string | undefined = undefined;
    if (profilePhoto) {
      try {
        profilePhotoUrl = await uploadToCloudinary(
          profilePhoto.buffer,
          "profile_photos"
        );
      } catch (error) {
        console.error("Error uploading profile photo:", error);
        throw new Error("Failed to upload profile photo");
      }
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        profilePhoto: profilePhotoUrl, // Store the URL if the photo is uploaded
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
      expiresIn: "7h",
    });
    return token;
  },
};
