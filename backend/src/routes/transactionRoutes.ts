import { Router } from "express";
import { TransactionController } from "../controllers/transactionController.js";
import { validate } from "../middleware/validateMiddleware.js";
import { AuthMiddleware } from "../middleware/authMiddleware.js";
import { createTransactionSchema, updateTransactionSchema } from "../validators/transaction.validator.js";
import { transactionQuerySchema } from "../validators/transactionQuery.validator.js";
import { validateTransactionQuery } from "../middleware/validateQueryMiddleware.js";

const router = Router();

router.post("/", AuthMiddleware, validate(createTransactionSchema), TransactionController.createTransaction);
router.get("/", AuthMiddleware, validateTransactionQuery, TransactionController.getTransactions);
router.get("/:id", AuthMiddleware, TransactionController.getTransactionById);
router.put("/:id", AuthMiddleware, validate(updateTransactionSchema), TransactionController.updateTransaction);
router.delete("/:id", AuthMiddleware, TransactionController.deleteTransaction);


export default router;