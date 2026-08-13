import prisma from "../config/db.js";
import { AppError } from "../utils/appError.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
export class AuthService {
    static async signup(data) {
        //check if user already exist
        const existingUser = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (existingUser) {
            throw new AppError("Email already exists", 409);
        }
        const userSelect = {
            id: true,
            name: true,
            email: true,
            currency: true,
            createdAt: true,
        };
        //hash password
        const hashedPassword = await hashPassword(data.password);
        //create user
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
            },
            select: userSelect,
        });
        //generate roken
        const token = generateToken(user.id);
        return {
            user,
            token,
        };
    }
    //login
    static async signin(data) {
        //find user
        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        //user not found
        if (!user) {
            throw new AppError("Invalid user Email or Password", 401);
        }
        //compare password
        const isPasswordvalid = await comparePassword(data.password, user.password);
        if (!isPasswordvalid) {
            throw new AppError("Invalid email or password", 401);
        }
        //4. generate token
        const token = generateToken(user.id);
        // 5. Remove password before returning
        const { password, ...safeUser } = user;
        return {
            user: safeUser,
            token,
        };
    }
    //getMe
    static async getMe(userId) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true,
                currency: true,
                createdAt: true,
            },
        });
        if (!user) {
            throw new AppError("User not found", 404);
        }
        return user;
    }
    static async updateProfile(userId, data) {
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                name: data.name,
                currency: data.currency,
            },
            select: {
                id: true,
                name: true,
                email: true,
                currency: true,
                createdAt: true,
            },
        });
        return user;
    }
    static async changePassword(userId, data) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new AppError("User not found", 404);
        }
        const isPasswordValid = await comparePassword(data.currentPassword, user.password);
        if (!isPasswordValid) {
            throw new AppError("Current password is incorrect", 401);
        }
        const hashedPassword = await hashPassword(data.newPassword);
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
        return { message: "Password changed successfully" };
    }
}
