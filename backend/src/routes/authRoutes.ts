import { Router } from "express";
import { AuthController } from "../controllers/authController.js";
import { validate } from "../middleware/validateMiddleware.js";
import { signupSchema, signinSchema } from "../validators/auth.validator.js";
import { AuthMiddleware } from "../middleware/authMiddleware.js";

const router =Router();

router.post("/signup", validate(signupSchema), AuthController.signup);

router.post("/signin", validate(signinSchema), AuthController.signin);

router.get("/me", AuthMiddleware, AuthController.me)

export default router;