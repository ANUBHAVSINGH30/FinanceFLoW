import { z } from "zod";
import { categoryEnum } from "./transaction.validator.js";

export const createBudgetSchema = z.object({
    category: categoryEnum,

    amount: z.coerce
        .number()
        .positive("Budget amount must be greater than 0"),

    month: z.coerce
        .number()
        .int()
        .min(1)
        .max(12),

    year: z.coerce
        .number()
        .int()
        .min(2000)
        .max(2100),
});

export const updateBudgetSchema = createBudgetSchema.pick({
    amount: true,
});

export const budgetQuerySchema = z.object({
    month: z.coerce
        .number()
        .int()
        .min(1)
        .max(12)
        .default(new Date().getMonth() + 1),

    year: z.coerce
        .number()
        .int()
        .min(2000)
        .max(2100)
        .default(new Date().getFullYear()),
});

export type CreateBudgetInput = z.infer<typeof createBudgetSchema>;
export type UpdateBudgetInput = z.infer<typeof updateBudgetSchema>;
export type BudgetQuery = z.infer<typeof budgetQuerySchema>;