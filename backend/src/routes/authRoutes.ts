import { Router } from "express";
import { AuthController } from "../controllers/authController.js";
import { validate } from "../middleware/validateMiddleware.js";
import { signupSchema, signinSchema } from "../validators/auth.validator.js";

const router =Router();

router.post("/signup", validate(signupSchema), AuthController.signup);

router.post("/signin", validate(signinSchema), AuthController.signin);

export default router;