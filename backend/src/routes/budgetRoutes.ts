import { Router } from "express";
import { BudgetController } from "../controllers/budgetController.js";
import { AuthMiddleware } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";
import { validateQuery } from "../middleware/validateQueryMiddleware.js";

import {createBudgetSchema, updateBudgetSchema, budgetQuerySchema,} from "../validators/budget.validator.js";

const router = Router();

router.post("/", AuthMiddleware, validate(createBudgetSchema), BudgetController.createBudget);

router.get("/", AuthMiddleware, validateQuery(budgetQuerySchema), BudgetController.getBudgets);

router.get("/:id", AuthMiddleware, BudgetController.getBudgetById);

router.put("/:id", AuthMiddleware, validate(updateBudgetSchema), BudgetController.updateBudget);

router.delete("/:id", AuthMiddleware, BudgetController.deleteBudget);

export default router;