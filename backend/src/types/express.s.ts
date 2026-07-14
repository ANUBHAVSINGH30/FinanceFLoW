import "express";
import type { TransactionQuery } from "../validators/transactionQuery.validator.js";

declare module "express-serve-static-core"{
    interface Request {
        userId?: string,
        validatedQuery?: TransactionQuery
    }
}