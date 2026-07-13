import { Router } from "express";
import authRoutes from "./authRoutes.js";
import transactionRoute from "./transactionRoutes.js"

const router = Router();

router.use("/auth", authRoutes);
router.use("/transactions", transactionRoute);

export default router;