import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 5* 60 * 1000,
  max: 100, 
  message: "Too many login attempts. Please try again later.",
});
