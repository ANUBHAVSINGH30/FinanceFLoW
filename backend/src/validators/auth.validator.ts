import { email, z } from "zod"

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

export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
