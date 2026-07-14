import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { transactionQuerySchema } from "../validators/transactionQuery.validator.js";

export const validateTransactionQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.validatedQuery = transactionQuerySchema.parse(req.query);

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.issues,
      });
    }

    next(error);
  }
};