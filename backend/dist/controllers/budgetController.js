import { BudgetServices } from "../services/budgetService.js";
export class BudgetController {
    static async createBudget(req, res, next) {
        try {
            const budget = await BudgetServices.createBudget(req.body, req.userId);
            return res.status(201).json({
                success: true,
                message: "Budget created successfully",
                data: budget,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getBudgets(req, res, next) {
        try {
            const result = await BudgetServices.getBudgets(req.userId, req.validatedQuery);
            return res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getBudgetById(req, res, next) {
        try {
            const budget = await BudgetServices.getBudgetById(req.params.id, req.userId);
            return res.status(200).json({
                success: true,
                data: budget,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async updateBudget(req, res, next) {
        try {
            const budget = await BudgetServices.updateBudget(req.params.id, req.userId, req.body);
            return res.status(200).json({
                success: true,
                message: "Budget updated successfully",
                data: budget,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async deleteBudget(req, res, next) {
        try {
            await BudgetServices.deleteBudget(req.params.id, req.userId);
            return res.status(200).json({
                success: true,
                message: "Budget deleted successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
}
