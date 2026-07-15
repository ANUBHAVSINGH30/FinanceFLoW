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
        const {page, limit, search, category, type,startDate, endDate, sortBy, orderBy } = req.validatedQuery!;

        const result = await TransactionServices.getTransactions(
            req.userId!,
            page,
            limit,
            search,
            category,
            type,
            startDate,
            endDate,
            sortBy,
            orderBy
        )
        
        return res.status(200).json({
            success: true,
            data: result,
        });

    } catch (error) {
        next(error);
    }
    }

    static async getTransactionById(
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) {
        try{
        const transaction =
        await TransactionServices.getTransactionById(
            req.params.id,
            req.userId!
        );

            return res.status(200).json({
                success: true,
                data: transaction,
            });
        } catch(error){
            next(error);
        }
    }

    static async updateTransaction(
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) {
        try{
            const transaction = await TransactionServices.updateTransaction(
            req.params.id,
            req.userId!,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Transaction updated successfully",
            data: transaction
        })
        }catch (error){
            next(error);
        }
    }


    static async deleteTransaction(
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) {
        try{
            const transaction = await TransactionServices.deleteTransaction(
                req.params.id,
                req.userId!
            );

            return res.status(200).json({
                success: true,
                message: "Transaction deleted successfully"
            });
        }catch(error){
            next(error);
        }
    }
}