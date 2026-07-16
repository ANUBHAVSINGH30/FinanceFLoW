import { transactionQuerySchema } from "../validators/transactionQuery.validator.js";


import { ZodType, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateQuery =
  <T>(schema: ZodType<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.validatedQuery = schema.parse(req.query);

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