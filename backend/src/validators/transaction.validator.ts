import {z} from "zod";
import { CATEGORIES } from "../constants/categories.js";

export const createTransactionSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(70, "Title cannot be more than 70 words"),

    amount: z
        .number()
        .positive("Amount should be a positive number"),

    type: z.enum(["income", "expense"]),

    category: z.enum(CATEGORIES),

    date: z.coerce.date(),

    note: z
        .string()
        .trim()
        .max(500)
        .optional(),

    isRecurring: z
        .boolean()
        .optional()
        .default(false),
});

export const updateTransactionSchema = createTransactionSchema.partial();

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
