import { Router } from "express";
import authRoutes from "./authRoutes.js";
import transactionRoute from "./transactionRoutes.js";
import dashboardRoute from "./dashboardRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/transactions", transactionRoute);
router.use("/dashboard", dashboardRoute);

export default router;