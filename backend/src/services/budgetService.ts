import prisma from "../config/db.js";
import { AppError } from "../utils/appError.js";

import type {
    CreateBudgetInput,
    UpdateBudgetInput,
    BudgetQuery,
} from "../validators/budget.validator.js";

export class BudgetServices {

    static async createBudget(
        data: CreateBudgetInput,
        userId: string
    ) {
        const existingBudget = await prisma.budget.findFirst({
        where: {
            userId,
            category: data.category,
            month: data.month,
            year: data.year,
        },
    });

    if (existingBudget) {
        throw new AppError(
            "Budget already exists for this category and month",
            400
        );
    }

    const budget = await prisma.budget.create({
        data: {
            ...data,
            userId,
        },
    });

    return budget;
    }

    
    
    
    static async getBudgets(
        userId: string,
        query: BudgetQuery
    ) {
        const { month, year } = query;

        const budgets = await prisma.budget.findMany({
            where: {
                userId,
                month,
                year,
            },
            orderBy: {
                category: "asc",
            },
        });

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);

        const expenses = await prisma.transaction.findMany({
            where: {
                userId,
                type: "expense",
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });

        const spentByCategory = new Map<string, number>();

        for (const transaction of expenses) {
            const current =
                spentByCategory.get(transaction.category) ?? 0;

            spentByCategory.set(
                transaction.category,
                current + Number(transaction.amount)
            );
        }

        return budgets.map((budget) => {
            const spent =
                spentByCategory.get(budget.category) ?? 0;

            const amount = Number(budget.amount);

            const remaining = amount - spent;

            const percentageUsed =
                amount === 0
                    ? 0
                    : Number(((spent / amount) * 100).toFixed(2));

            let status = "Within Budget";

            if (percentageUsed >= 100) {
                status = "Over Budget";
            } else if (percentageUsed >= 80) {
                status = "Near Limit";
            }

            return {
                ...budget,

                amount,

                spent,

                remaining,

                percentageUsed,

                status,
            };
        });
    }

    
    
    
    static async getBudgetById(
        budgetId: string,
        userId: string
    ) {
        const budget = await prisma.budget.findFirst({
        where: {
            id: budgetId,
            userId,
        },
    });

    if (!budget) {
        throw new AppError("Budget not found", 404);
    }

    return budget;
    }

    
    
    static async updateBudget(
        budgetId: string,
        userId: string,
        data: UpdateBudgetInput
    ) {
        const result = await prisma.budget.updateMany({
        where: {
            id: budgetId,
            userId,
        },
        data,
    });

    if (result.count === 0) {
        throw new AppError("Budget not found", 404);
    }

    const updatedBudget = await prisma.budget.findFirst({
        where: {
            id: budgetId,
            userId,
        },
    });

    if (!updatedBudget) {
        throw new AppError("Budget not found", 404);
    }

    return updatedBudget;
    }

    
    
    
    static async deleteBudget(
        budgetId: string,
        userId: string
    ) {
        const result = await prisma.budget.deleteMany({
        where: {
            id: budgetId,
            userId,
        },
    });

    if (result.count === 0) {
        throw new AppError("Budget not found", 404);
    }
    }
}