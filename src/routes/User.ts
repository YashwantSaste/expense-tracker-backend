import express from "express";
import { signupUser, loginUser } from "../controllers/UserController";
import { loginRateLimiter, validateSignup } from "../middlewares/authMiddleware";
const router = express.Router();

router.post("/signup",validateSignup,signupUser);
router.post("/login",loginRateLimiter,loginUser);

export default router;