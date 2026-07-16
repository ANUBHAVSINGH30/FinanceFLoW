import { Router } from "express";
import { AuthMiddleware } from "../middleware/authMiddleware.js";
import {DashboardController} from "../controllers/dashboardController.js";
import { validateQuery } from "../middleware/validateQueryMiddleware.js";
import { dashboardQuerySchema } from "../validators/dashboard.validator.js";

const router = Router();

router.get("/summary", AuthMiddleware, validateQuery(dashboardQuerySchema), DashboardController.getSummary);
router.get("/category-beakdown", AuthMiddleware,validateQuery(dashboardQuerySchema), DashboardController.getCategoryBreakdown);
// router.get("/monthly-trend", AuthMiddleware, DashboardController.getMonthlyTrend);

export default router;