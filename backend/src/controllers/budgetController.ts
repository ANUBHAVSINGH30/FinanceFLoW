import { Request, Response, NextFunction } from "express";

import { BudgetServices } from "../services/budgetService.js";
import { BudgetQuery } from "../validators/budget.validator.js";

export class BudgetController {

    static async createBudget(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {

            const budget = await BudgetServices.createBudget(
                req.body,
                req.userId!
            );

            return res.status(201).json({
                success: true,
                message: "Budget created successfully",
                data: budget,
            });

        } catch (error) {
            next(error);
        }
    }

    static async getBudgets(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {

            const result = await BudgetServices.getBudgets(
                req.userId!,
                req.validatedQuery as BudgetQuery
            );

            return res.status(200).json({
                success: true,
                data: result,
            });

        } catch (error) {
            next(error);
        }
    }

    static async getBudgetById(
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) {
        try {

            const budget =
                await BudgetServices.getBudgetById(
                    req.params.id,
                    req.userId!
                );

            return res.status(200).json({
                success: true,
                data: budget,
            });

        } catch (error) {
            next(error);
        }
    }

    static async updateBudget(
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) {
        try {

            const budget =
                await BudgetServices.updateBudget(
                    req.params.id,
                    req.userId!,
                    req.body
                );

            return res.status(200).json({
                success: true,
                message: "Budget updated successfully",
                data: budget,
            });

        } catch (error) {
            next(error);
        }
    }

    static async deleteBudget(
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) {
        try {

            await BudgetServices.deleteBudget(
                req.params.id,
                req.userId!
            );

            return res.status(200).json({
                success: true,
                message: "Budget deleted successfully",
            });

        } catch (error) {
            next(error);
        }
    }
}