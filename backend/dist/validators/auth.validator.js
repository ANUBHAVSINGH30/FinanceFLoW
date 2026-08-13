import { z } from "zod";
export const signupSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be atleast 2 character")
        .max(50, "Name should not be more than 50 character"),
    email: z
        .email("Invalid email address")
        .transform((email) => email.toLowerCase()),
    password: z
        .string()
        .min(8, "Password must be atleast 8 character")
        .max(100),
});
export const signinSchema = z.object({
    email: z
        .email("Invalid email address")
        .transform((email) => email.toLowerCase()),
    password: z.string().min(1, "Password is required")
});
export const updateProfileSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(50, "Name should not be more than 50 characters").optional(),
    currency: z.enum(["INR", "USD", "EUR", "GBP", "JPY", "CAD", "AUD"]).optional(),
}).refine((data) => data.name || data.currency, {
    message: "At least one field (name or currency) is required",
});
export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters").max(100),
}).refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
});
