import {z} from "zod";
import { CATEGORIES } from "../constants/categories.js";

export const categoryEnum = z.enum(CATEGORIES);
export const transactionTypeEnum = z.enum(["income", "expense"]);
export const sortByEnum = z.enum([
    "date",
    "amount",
    "title",
    "category",
]);

export const orderEnum = z.enum([
    "asc",
    "desc",
]);

export const createTransactionSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(70, "Title cannot be more than 70 words"),

    amount: z
        .number()
        .positive("Amount should be a positive number"),

    type: transactionTypeEnum,

    category: categoryEnum,

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
export type Category = z.infer<typeof categoryEnum>;
export type Type = z.infer<typeof transactionTypeEnum>;
export type SortBy = z.infer<typeof sortByEnum>;
export type Order = z.infer<typeof orderEnum>;