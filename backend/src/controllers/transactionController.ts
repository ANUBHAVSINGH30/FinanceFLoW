import { Request, Response, NextFunction } from "express";
import { TransactionServices } from "../services/transactionService.js";

export class TransactionController {
  static async createTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const transaction = await TransactionServices.createTransaction(
        req.body,
        req.userId!
      );

      return res.status(201).json({
        success: true,
        message: "Transaction created successfully",
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTransactions(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const transactions =
            await TransactionServices.getTransactions(
                req.userId!
            );

        return res.status(200).json({
            success: true,
            data: transactions
        });

    } catch (error) {
        next(error);
    }
}
}