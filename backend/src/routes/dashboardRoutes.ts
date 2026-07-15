import { Router } from "express";
import { AuthMiddleware } from "../middleware/authMiddleware.js";
import {DashboardController} from "../controllers/dashboardController.js";

const router = Router();

router.get("/summary", AuthMiddleware, DashboardController.getSummary);

export default router;