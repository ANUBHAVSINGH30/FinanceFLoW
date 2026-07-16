import { z } from "zod";

export const dashboardQuerySchema = z.object({
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

export const monthlyQuerySchema = z.object({
    year: z.coerce
        .number()
        .int()
        .min(2000)
        .max(2100)
        .default(new Date().getFullYear()),
});

export type DashboardQuery = z.infer<typeof dashboardQuerySchema>;
export type MonthlyQuery = z.infer<typeof monthlyQuerySchema>;