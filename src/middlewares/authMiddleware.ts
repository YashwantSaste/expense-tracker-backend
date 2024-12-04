import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit"
dotenv.config();

interface JwtPayload {
  userId: string;
}

export const authenticateUser = (req: Request, res: Response, next: NextFunction):any => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  const JWT_SECRET =process.env.JWT_SECRET as string;

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = { id: decoded.userId }; 
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token." });
  }
};

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per window
  message: "Too many login attempts. Please try again later.",
});

// Validation middleware for signup
export const validateSignup = (req: Request, res: Response, next: NextFunction):any => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long." });
  }

  next();
};
