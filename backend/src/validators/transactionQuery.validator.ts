import { z } from "zod";
import { CATEGORIES } from "../constants/categories.js";
import { transactionTypeEnum,sortByEnum, orderEnum } from "./transaction.validator.js";

export const categoryEnum = z.enum(CATEGORIES);

export const transactionQuerySchema = z.object({
    page: z.coerce
        .number()
        .int()
        .min(1)
        .default(1),  

    limit: z.coerce
        .number()
        .int()
        .min(1)
        .max(100)
        .default(10),

    search: z.string().trim().optional(),

    category: categoryEnum.optional(),

    type: transactionTypeEnum.optional(),

    startDate: z.coerce.date().optional(),

    endDate: z.coerce.date().optional(),

    sortBy: sortByEnum.default("date"),

    orderBy: orderEnum.default("desc"),
});

export type TransactionQuery = z.infer<typeof transactionQuerySchema>;