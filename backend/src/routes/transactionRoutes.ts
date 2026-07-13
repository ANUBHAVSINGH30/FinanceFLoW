import { Router } from "express";
import { TransactionController } from "../controllers/transactionController.js";
import { validate } from "../middleware/validateMiddleware.js";
import { AuthMiddleware } from "../middleware/authMiddleware.js";
import { createTransactionSchema } from "../validators/transaction.validator.js";

const router = Router();

router.post("/", AuthMiddleware, validate(createTransactionSchema), TransactionController.createTransaction);
router.get("/", AuthMiddleware, TransactionController.getTransactions);


export default router;