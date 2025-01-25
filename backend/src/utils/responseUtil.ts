import { Response } from "express";

export const responseUtil = {
  sendSuccess: (res: Response, message: string, data: any = null) => {
    res.status(200).json({ message, data });
  },

  sendError: (res: Response, error: any) => {
    console.error(error);
    res
      .status(500)
      .json({
        message: error.message || "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? error : {},
      });
  },
};
