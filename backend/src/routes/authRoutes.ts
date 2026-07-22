import { Router } from "express";
import { AuthController } from "../controllers/authController.js";
import { validate } from "../middleware/validateMiddleware.js";
import { signupSchema, signinSchema } from "../validators/auth.validator.js";
import { AuthMiddleware } from "../middleware/authMiddleware.js";
import { authLimiter } from "../middleware/rateLimitMiddleaware.js";

const router =Router();

router.post("/signup", authLimiter, validate(signupSchema), AuthController.signup);

router.post("/signin", authLimiter,validate(signinSchema), AuthController.signin);

router.get("/me", AuthMiddleware, AuthController.me)

export default router;