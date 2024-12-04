import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const signupUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(403).json({
            success: false,
            message: "Please fill up all the mandatory fields"
        });
        return;
    }

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            res.status(400).json({
                success: false,
                message: "User already exists"
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            data: newUser.userId,
            message: "User has been registered successfully"
        });

    } catch (error) {
        console.log("Error while registering the user");
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(403).json({
            status: false,
            message: "Please fill all the mandatory fields"
        });
        return;
    }

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            res.status(403).json({
                success: false,
                message: "User not found"
            });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid credentials." });
            return;
        }

        const token = jwt.sign({ userId: user.userId, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

        res.json({
            success: true,
            message: 'User has been successfully logged in',
            data: token
        });

    } catch (error) {
        console.log("Error while logging in the user");
        console.log(error);
        res.status(500).json({
            status: false,
            message: 'Internal server error'
        });
    }
};
