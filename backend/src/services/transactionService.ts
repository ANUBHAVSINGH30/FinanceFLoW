import prisma from "../config/db.js";
import type { CreateTransactionInput, UpdateTransactionInput } from "../validators/transaction.validator.js";
import { AppError } from "../utils/appError.js";
import { Category,Type } from "../validators/transaction.validator.js";

export class TransactionServices {
    static async createTransaction(
        data: CreateTransactionInput,
        userId: string
    ) {
        const transaction = await prisma.transaction.create({
            data: {
                title: data.title,
                amount: data.amount,
                type: data.type,
                category: data.category,
                date: data.date,
                note: data.note,
                isRecurring: data.isRecurring,
                userId,
            },
        });

        return transaction;
    }

    //get transaction business logic
    static async getTransactions(
        userId: string,
        page: number,
        limit: number,
        search?: string,
        category?: Category,
        type?: Type,
        startDate?: Date,
        endDate?: Date) {

    const skip = (page - 1) * limit;

    const where = {
    userId,

    ...(search && {
        OR: [
            {
                title: {
                    contains: search,
                    mode: "insensitive" as const,
                },
            },
            {
                note: {
                    contains: search,
                    mode: "insensitive" as const,
                },
            },
            ],
        }),

        ...(category && {
            category,
        }),

        ...(type && {
            type,
        }),

        ...(startDate &&
            endDate && {
                date: {
                gte: startDate,
                lte: endDate,
            },
        }),
    };

    const total = await prisma.transaction.count({
        where,
    });

    const transactions = await prisma.transaction.findMany({
        where,
        orderBy: {
            date: "desc"
        },
        skip,
        take: limit,
    })

    return {
        transactions,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total/ limit),
        },
    };
    }

    static async getTransactionById(
        transactionId: string,
        userId: string
    ) {
        const transaction = await prisma.transaction.findFirst({
            where: {
                id: transactionId,
                userId
            },
        });

        if(!transaction){
            throw new AppError ("Transaction not found", 404);
        }

        return transaction
    }

    static async updateTransaction(
        transactionId: string,
        userId: string,
        data: UpdateTransactionInput
    ){
        const result = await prisma.transaction.updateMany({
            where: {
                id: transactionId,
                userId,
            },
            data,
        });

        if(result.count === 0) {
            throw new AppError("Transaction not found", 404);
        }

        const updateTransaction = await prisma.transaction.findFirst({
            where: {
                id: transactionId,
                userId
            },
        });

        if (!updateTransaction) {
            throw new AppError("Transaction not found", 404);
        }

        return updateTransaction;
    }


    static async deleteTransaction(
        transactionId: string,
        userId: string
    ) {    
            const result = await prisma.transaction.deleteMany({
                where: {
                    id: transactionId,
                    userId
                },
            });

            if(result.count === 0){
                throw new AppError("Transaction not found", 404);
            }
        };
}

